import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { GoogleSigninButtonModule } from "@abacritt/angularx-social-login";



@NgModule({
  declarations: [
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

  ]
})
export class CoreModule { }
