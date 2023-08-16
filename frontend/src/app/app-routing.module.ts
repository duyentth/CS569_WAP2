import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { LoginComponent } from './user/login.component';
import { checkTokenGuard } from './check-token.guard';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: WelcomeComponent, pathMatch: 'full' , title:"Home"},
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule),
  },
  {
    path: 'group',
    loadChildren: () =>
      import('./group/group.module').then((module) => module.GroupModule),
    canActivate: [checkTokenGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
