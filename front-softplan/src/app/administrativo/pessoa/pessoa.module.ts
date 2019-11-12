import { NgModule }       from '@angular/core';

import { MRSharedModule }    from '../../mr-shared.module';

import { PessoaListComponent }    from './pessoa-list.component';
import { PessoaDetailComponent }  from './pessoa-detail.component';

import { NgxMaskModule } from 'ngx-mask';

import { PessoaService } from './pessoa.service';
import { PessoaRoutingModule } from './pessoa-routing.module';

@NgModule({
  imports: [    
    MRSharedModule,
    PessoaRoutingModule,
    NgxMaskModule.forRoot(null)   
  ],
  declarations: [
    PessoaListComponent,
    PessoaDetailComponent    
  ],
  providers: [
    PessoaService
  ]
})

export class PessoaModule {}

