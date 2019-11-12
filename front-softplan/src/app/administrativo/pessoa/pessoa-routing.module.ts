import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../../shared/auth/auth.guard";

import { PessoaListComponent }    from './pessoa-list.component';
import { PessoaDetailComponent }    from './pessoa-detail.component';

const lojaRoutes: Routes = [
  { path: '',
          children: [
               { path :'' , component: PessoaListComponent ,canActivateChild: [AuthGuard] },
               { path :':id' , component: PessoaDetailComponent ,canActivateChild: [AuthGuard] }
          ]      
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(lojaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PessoaRoutingModule { }
