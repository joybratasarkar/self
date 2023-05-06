import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { GoogleSigninButtonModule } from "@abacritt/angularx-social-login";
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';
import { LayoutComponent } from './projectLayout/layout/layout.component';



@NgModule({
  declarations: [
  
    ErrorPopupComponent,
       LayoutComponent
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
