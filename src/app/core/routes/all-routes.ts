import { Routes } from "@angular/router";



export const ALL_ROUTES: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full'
    // },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../Dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];