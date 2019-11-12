import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./shared/auth/auth.guard";
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from "./login/login.component";
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
 
const routes: Routes = [
  { path: '',                             redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login',                        component: LoginComponent , canActivate: [AuthGuard]},
  { path: 'dashboard',                    component: DashboardComponent , canActivate: [AuthGuard]},      
  { path: 'administrativo',               loadChildren: 'app/administrativo/administrativo.module#AdministrativoModule',canActivate: [AuthGuard]} ,    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}