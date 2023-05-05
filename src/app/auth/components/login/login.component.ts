import { GoogleLoginProvider, SocialAuthService, SocialUser, VKLoginProvider } from '@abacritt/angularx-social-login';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
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
    private googleAuthService: SocialAuthService
  ) {
    this.googleAuthService.authState.subscribe((user) => {
      debugger;
      var socialUser = user;
      var isLoggedIn = (user != null);
      console.log('socialUser',socialUser);
      
      debugger;
    });
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


    // this.googleAuthService.authState.subscribe(
    //   {
    //     next: (response: any) => {

    //       this.user = response;
    //       this.loggedIn = (response != null);

    //     },
    //     error: (error: any) => {
    //       console.log('error', error);

    //     }
    //   }
    // );



  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    debugger;
    this.auth
      .login(this.loginForm.value)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (response: any) => {
          this.toaster.toastSuccess('loginSuccess')
        },
        error: (error: any) => {
          this.toaster.toastError(error)

        }
      });
  }
  signInWithVK(): void {
    debugger;
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    debugger;
  }

  signOut(): void {
    this.googleAuthService.signOut();

    // this.googleAuthService.signOut();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

}
