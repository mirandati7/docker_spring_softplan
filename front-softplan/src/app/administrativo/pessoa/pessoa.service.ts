
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CrudService } from '../../shared/service/crud.service';
import { PageResult, SearchParams } from '../../shared/service/generic.service';
import { MessageService } from '../../shared/service/message.service';
import { Pessoa } from './pessoa.model';


@Injectable()
export class PessoaService extends CrudService<Pessoa> {
  
  public url: string = "api/pessoas";
  pageResult: PageResult = new PageResult();
  

    constructor(_http: HttpClient, _message: MessageService) { 
        super(<any>_http, _message);
    } 

    public list(search: SearchParams) {
        let self = this;
        return this.search(this.url + '/search', search)
            .subscribe(res => {
                self.pageResult = res;        
                
            });
    }
    
    public findByCPF(cpf: string){
        let self = this;
        return this.get(`${this.url}/findByCPF/${cpf}`).toPromise()
        .then(res =><Pessoa>res );
    }
   



}


