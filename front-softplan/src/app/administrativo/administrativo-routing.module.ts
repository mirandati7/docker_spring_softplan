import { NgModule }         from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../shared/auth/auth.guard";

@NgModule({
  imports: [RouterModule.forChild([    
    { path: 'pessoa',                  loadChildren: 'app/administrativo/pessoa/pessoa.module#PessoaModule', canActivate: [AuthGuard] } ,
  ])],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule {}
