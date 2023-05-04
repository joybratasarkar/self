import { SocialAuthService, SocialUser, VKLoginProvider } from '@abacritt/angularx-social-login';
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
    private authService: SocialAuthService
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


    this.authService.authState.subscribe(
      {
        next: (response: any) => {

          this.user = response;
          this.loggedIn = (response != null);

        },
        error: (error: any) => {
          console.log('error', error);

        }
      }
    );



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
    // default usage without defining access level
    this.authService.signIn(VKLoginProvider.PROVIDER_ID);

    // define access level
    // https://dev.vk.com/reference/access-rights
    this.authService.signIn(VKLoginProvider.PROVIDER_ID, ['offline', 'email']);
  }

  signOut(): void {
    this.authService.signOut();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

}
