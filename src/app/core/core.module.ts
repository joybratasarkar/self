import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { GoogleSigninButtonModule } from "@abacritt/angularx-social-login";
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';



@NgModule({
  declarations: [
  
    ErrorPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,   
    GoogleSigninButtonModule, 
  ],
  exports: [
    GoogleSigninButtonModule,
    ErrorPopupComponent
  ]
})
export class CoreModule { }
