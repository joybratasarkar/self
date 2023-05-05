import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from '../core/material/material.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    GoogleSigninButtonModule,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AuthModule { }
