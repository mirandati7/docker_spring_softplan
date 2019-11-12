import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {URLSearchParams} from '@angular/http';
import {MessageService} from './message.service';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Prepara um objeto para uma pesquisa get com parâmetros
 */
export const objToSearchParams = (obj: any): URLSearchParams => {
    let params = new URLSearchParams();
    for (let k in obj) {
        if (obj[k]) params.append(k, obj[k]);
    }
    return params;
};

export const objToParams = (obj: any): HttpParams => {
    let params = new HttpParams();
    
    for (let k in obj) {
        
        if (obj[k]) {
            params = params.set(k, obj[k]);            
        }
            

    }

    return params;
};

/**
 * Result para uma consulta paginada
 */
export class PageResult {
    public totalElements: number = 0;
    public totalPages: number = 0;
    public size: number = 10;
    public content: Array<any> = [];
}

/**
 * Result para uma consulta paginada
 */
export class SearchParams {
    public page: number;
    public size: number;
    public sorting: { [key: string]: string } = {};
    public filters: { [key: string]: any } = {};
}

export abstract class GenericService {

    public authToken: string = '';
    private _http: HttpClient;
    protected _message: MessageService;    

    public _endpoint:string = environment.apiUrl;

    constructor(_http: HttpClient, _message: MessageService) {
        this._http = _http;
        this._message = _message;            
    }

    headers() {

         let authToken = this.authSession(); 
         let headersRequest = new HttpHeaders();
         headersRequest = headersRequest.set('Authorization', `Bearer ${authToken}`).set('Content-Type', 'application/json');
 
         return {headers: headersRequest};
    }


    public post(url: string, param: Object): Observable<any> {
        url = this._endpoint + url;
        let HttpRequestHeader = this.headers();
        return this._http.post(url, param, {headers: HttpRequestHeader.headers})
    }


    public postPromisse(url: string, param: Object): Promise<any> {        
        let body = JSON.stringify(param);        
        
        // Formacao do Endpoint
        url = this._endpoint + url;

        return this._http.post(url, body, this.headers())
            .toPromise();
    }

    
    /**
     * pesquisa paginada
     */
    public search(url: string, search: SearchParams) {
        return this.post(url, search)
    }


    public get(url: string, params?: {}) {
        // Formacao do Endpoint
        url = this._endpoint + url;
        let options;

        if (params) {
            
            let httpParams = objToParams(params);
            options = { params: httpParams, headers: this.headers() };
            
            return this._http.get(url, options);

        } else {    
            let HttpRequestHeader = this.headers();
            return this._http.get(url,  {headers: HttpRequestHeader.headers});
        }
    }

    public delete(url: string, id: number) {
        // Formacao do Endpoint
        url = this._endpoint + url;

        return this._http.delete(`${url}/${id}`, this.headers()).pipe(
            catchError(err => this.handleError(err)));
    }

    public inactivate(url: string, id: number) {
        
        // Formacao do Endpoint
        url = this._endpoint + url;

        return this._http.delete(`${url}/${id}`, this.headers()).pipe(
            catchError(err => this.handleError(err)));
    }

    private handleError(error: any) {

        let _body = error._body ? JSON.parse(error._body) : undefined;
        let errMsg = error.message || 'Server error';

        if (_body.message == "Sessão expirou!"){
            alert("Sessão Expirou. Faça Login Novamente");
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
        }

        if (_body.businessException) {
            errMsg = _body.businessException.message;
            this._message.info(errMsg);
        }

        return observableThrowError(errMsg);
    }

    public authSession(){
        if(localStorage.getItem('authToken') != undefined){
          this.authToken = localStorage.getItem('authToken');
          return this.authToken;
        }else{
          if(sessionStorage.getItem('authToken') != undefined){
            this.authToken = sessionStorage.getItem('authToken');
            return this.authToken;
          }else{
            return this.authToken;
          }
        }
    }
}