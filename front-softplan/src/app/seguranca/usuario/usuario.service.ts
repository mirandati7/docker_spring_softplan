import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { CrudService } from '../../shared/service/crud.service';
import { MessageService } from '../../shared/service/message.service';
import { PageResult, SearchParams } from '../../shared/service/generic.service';

import { Usuario } from './usuario.model';
import { UsuarioLogado } from './usuario-logado.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsuarioService extends CrudService<Usuario> {

  public url: string = "api/usuarios";
  pageResult: PageResult = new PageResult();

  public modelUsuario:{login:string, password:string};

  constructor(_http: HttpClient, _message: MessageService) {
    super(<any>_http, _message);
  }
  
  public usuarioLogado:any = new Usuario();

  public findbyLogin(login:string) {   

      this.url = this.url + "/autenticar";    

     this.get(this.url).subscribe(res => {
                this.usuarioLogado   =    res;            
        });
         
  }


}


