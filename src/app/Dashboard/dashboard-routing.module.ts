import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [

  
  {
    path: '',
    redirectTo: 'LayoutComponent',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
  },
  // { path: 'room/:room_name', component: LayoutComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
