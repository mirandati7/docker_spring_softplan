import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { MRSharedModule } from '../../mr-shared.module';
import { UsuarioService } from './usuario.service';

@NgModule({
  imports: [    
    MRSharedModule,
    NgxMaskModule.forRoot(null)           
  ],
  declarations: [
  ],
  providers: [
    UsuarioService
  ]
})

export class UsuarioModule {}

