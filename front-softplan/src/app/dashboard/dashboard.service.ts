import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { CrudService } from '../shared/service/crud.service';
import { MessageService } from  '../shared/service/message.service';
import { Dashboard } from './dashboard.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService extends CrudService<Dashboard> {
  
    public url: string = "api/dashboard";

    constructor(_http: HttpClient, _message: MessageService) { 
        super(<any>_http, _message);
    }

    public total(idPatio: Number) {        
        return this.get(`${this.url}/total/`).toPromise().then(res => 
              <Dashboard>res);     
    }


    

}


