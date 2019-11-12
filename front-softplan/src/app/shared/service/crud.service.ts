
import {map} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { PageResult, GenericService, SearchParams } from './generic.service';
import { GenericModel } from '../model/generic.model';
import { MessageService } from './message.service';

import { LazyLoadEvent, FilterMetadata } from '../primeng/common/api';
import { HttpClient } from '@angular/common/http';

export abstract class CrudService<T extends GenericModel> extends GenericService {

    public url: string;
    pageResult: PageResult = new PageResult();
    qtdeRegistros:number=10;

    constructor(_http: HttpClient, _message: MessageService) {
        super(_http, _message);
    }

    /**
     * Save entity
     */
    public save(model: T): Observable<any> {
        return this.post(this.url, model);
    }

     /**
     * Save Promisse
     */
    public savePromisse(model: T): Promise<Response> {
        return this.postPromisse(this.url, model);
    }

    /**
     * Remove entity
     */
    public remove(id: number) {
        return this.delete(this.url, id);
    }

    /**
     * Finde one entity
     */
    public findOne(id: number) {
        return this.get(`${this.url}/${id}`).pipe(map(res => <T>res ));        
    }


   /**
     * findAll
     */
    public list(search: SearchParams) {
        let self = this;
        return this.search(this.url + '/search', search)
            .subscribe(res => {
                self.pageResult = res;
            });
    }
    

}