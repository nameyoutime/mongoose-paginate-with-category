import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home/1', pathMatch: 'full' },
  { path: 'home/:page', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'category/:id/:page', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'refresh', loadChildren: () => import('./pages/refresh/refresh.module').then(m => m.RefreshModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
