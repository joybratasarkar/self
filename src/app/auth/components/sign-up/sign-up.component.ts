import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm!: FormGroup;
  togglePassword: boolean = true;
  private _unsubscribe$ = new Subject<boolean>;
  constructor(
    public _utility:UtilityService,
    private _auth:AuthService,
    private _localStorage:LocalStorageService,
    private _router:Router,
    private toaster: ToasterService,
  )
  {

  }
ngOnInit():void
{
  this.signupForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
       Validators.maxLength(50),
      // Validators.pattern(ONLY_STRING_VALUES)
    ]),
    email: new FormControl(null, [Validators.required, 
      Validators.email,
      // Validators.pattern(EMAIL_ID_DOMAIN)
    ]),
    password: new FormControl(null, [
      Validators.required,
      // Validators.pattern(PASSWORD_REGEX), 
      Validators.minLength(8),
       Validators.maxLength(16)])

  });
}

onSubmit(){
  if(!this.signupForm.valid){
    return
  }
  // this.store.dispatch(signUpStart(this.signupForm.value));
  // this._router.navigate(['/auth/login']);
  
  this._auth
  .Signup(this.signupForm.value)
  .pipe(takeUntil(this._unsubscribe$))
  .subscribe({
    next: (response:HttpResponse<any>) => {
      // this._auth.isLoggedIn.next(true);
      
      // this._localStorage.setAuthToken(response.body.jwt || '');
      // this._router.navigate(['/dashboard']);

      // this._localStorage.setAuthToken(response.headers.get('x-amzn-Remapped-authorization') || response.headers.get('Authorization') || '');
      
      this.toaster.toastSuccess('Signup Success')
    },
    error: (error: any) => {
      
      this.toaster.toastError(error.error.email[0])
      
    }
  });
}
get formControl() {
  return this.signupForm.controls;
}
}
