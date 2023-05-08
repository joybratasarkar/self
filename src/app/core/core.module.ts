import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule } from "@angular/common/http";
import { GoogleSigninButtonModule } from "@abacritt/angularx-social-login";
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';
import { ProjectLayoutComponent } from "./components/project-layout/project-layout.component";
import { CreateAServerDialogComponent } from './dialog/create-a-server-dialog/create-a-server-dialog.component';



@NgModule({
  declarations: [
  
    ErrorPopupComponent,
       ProjectLayoutComponent,
       CreateAServerDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,   
    GoogleSigninButtonModule,
    MaterialModule 
  ],
  exports: [
    GoogleSigninButtonModule,
    ErrorPopupComponent,
    MaterialModule
  ]
})
export class CoreModule { }
