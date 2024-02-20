import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { DashboardPage } from './dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '', component: AdminPage,
    data: {
      title: '...'
    },
    children: [
      {
        path: 'admin/dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule { }
