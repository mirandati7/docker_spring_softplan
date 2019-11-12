// VARIÁVEIS GLOBAIS QUE PODEM SER ACESSADAS EM TODO PROJETO
import { Injectable } from '@angular/core';

import { UsuarioLogado } from '../../seguranca/usuario/usuario-logado.model';

@Injectable()
export class GlobalsVariablesService {
    permissao = Object();
    usuarioLogado = Object();
    isPermissao:Boolean = false;    

    public setGlobalsVariables(usuarioLogado:UsuarioLogado){ 
    
    }

    get getPermissoes(){
        return this.permissao;
    }

    get getUsuarioLogado(){
        /*
        if(this.usuarioLogado.caminhoImagem == null){
            this.usuarioLogado.caminhoImagem = './assets/img/logo-usuario.png';
        }*/
        return this.usuarioLogado;
    }

    get getPermissaoSuccess(){
        return this.isPermissao;
    }

    public blockedGlobalsVariables(){
    }


    get setupModel(){
        return null;
    }
  
} 
