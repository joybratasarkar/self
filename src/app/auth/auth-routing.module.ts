import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProjectGuard } from '../core/guards/project.guard';

const routes: Routes = [
  {
    path : "",
    redirectTo : "login",
    pathMatch : 'full',
  },
  {
    path : "login",
    component : LoginComponent,
    // canActivate: [ProjectGuard]

  },
  {
    path : "signup",
    component : SignUpComponent,
    // canActivate: [ProjectGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
