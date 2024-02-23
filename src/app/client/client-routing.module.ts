import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';
import { DashboardPage } from './dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '', component: ClientPage,

    data: {
      title: '...'
    },
    children: [
      {
        path: 'client/dashboard',
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
export class ClientPageRoutingModule {}
