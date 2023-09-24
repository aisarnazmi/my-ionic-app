import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HomeGuard } from '../guards/home.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [HomeGuard],
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'asset-list',
        loadChildren: () => import('./pages/asset-list/asset-list.module').then( m => m.AssetListPageModule)
      },
      {
        path: 'add-asset',
        loadChildren: () => import('./pages/add-asset/add-asset.module').then( m => m.AddAssetPageModule)
      },
      {
        path: 'add-asset/:id',
        loadChildren: () => import('./pages/add-asset/add-asset.module').then( m => m.AddAssetPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
