import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../shared/service/crud.service';
import { MessageService } from  '../shared/service/message.service';
import { Dashboard } from './dashboard.model';

@Injectable()
export class DashboardService extends CrudService<Dashboard> {

    public url: string = "api/dashboard";

    constructor(_http: HttpClient, _message: MessageService) {
        super(<any>_http, _message);
    }




}


