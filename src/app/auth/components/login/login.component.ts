import { GoogleLoginProvider, SocialAuthService, SocialUser, VKLoginProvider } from '@abacritt/angularx-social-login';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private _unsubscribe$ = new Subject<boolean>;
  loginForm!: FormGroup;
  togglePassword: boolean = true;
  user!: SocialUser;
  loggedIn!: boolean;
  constructor(
    private auth: AuthService,
    private toaster: ToasterService,
    private googleAuthService: SocialAuthService,
    private _localStorage:LocalStorageService,
    private _router:Router
  ) {
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        // Validators.email,
        // Validators.pattern(/\.[a-zA-Z]{2,3}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        // Validators.minLength(4),
        // Validators.maxLength(16),
      ]),
    });

    this.googleAuthService.authState.subscribe(
      {
        next: (response: any) => {
          
          this.user = response;
          this.loggedIn = (response != null);
          this._router.navigate(['/dashboard']);
          this._localStorage.setAuthToken(response.idToken || '');          
          this.toaster.toastSuccess('loginSuccess')

        },
        error: (error: any) => {
          
          console.log('error', error);

        }
      }
    );
  }
  onSubmit(event: any) {
    const submitButtonName = event.submitter.getAttribute('name');
    
    if (!this.loginForm.valid) {
      return;
    }
    if(submitButtonName==='login')
    {

      this.auth
      .login(this.loginForm.value,)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (response:HttpResponse<any>) => {
          this.auth.isLoggedIn.next(true);
          console.log('response.headers',response.headers);
          const authToken = response.headers.get('Authorization');
          console.log(`Authorization header value: ${authToken}`);
          
          this._localStorage.setAuthToken(response.body.jwt || '');
          this._router.navigate(['/dashboard']);

          // this._localStorage.setAuthToken(response.headers.get('x-amzn-Remapped-authorization') || response.headers.get('Authorization') || '');
          
          this.toaster.toastSuccess('loginSuccess')
        },
        error: (error: any) => {
          
          this.toaster.toastError(error.message)
          
        }
      });
    }
  }
  signInWithVK(): void {
    
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }

  signOut(): void {
    this.googleAuthService.signOut();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
    // this.auth.removeLocalStorageData()
  }

}
