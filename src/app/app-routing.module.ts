
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { ALL_ROUTES } from './core/routes/all-routes';
import { ProjectLayoutComponent } from './core/components/project-layout/project-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canActivate: [ProjectGuard]

  },
  {
    path: '',
    component: ProjectLayoutComponent,
    children: ALL_ROUTES,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
