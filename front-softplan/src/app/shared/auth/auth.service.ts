
import {map} from 'rxjs/operators';
import {Injectable,EventEmitter} from "@angular/core";
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import {GenericService} from "../service/generic.service";
import {MessageService} from "../service/message.service";

import { UsuarioLogado } from '../../seguranca/usuario/usuario-logado.model';

import { LoginComponent } from "../../login/login.component";
import { HttpClient } from '@angular/common/http';
import { Resultado } from '../util/resultado.model';


export class JwtHelper {

  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }

  // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c: any) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  public decodeToken(token: string): any {
    let parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date == null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}

@Injectable()
export class AuthService extends GenericService {

    public static AUTH_TOKEN: string = 'authToken';
    
    private url: string = 'auth/';

    public blockRoute: boolean = false;
    
    private afterAuthenticate: EventEmitter<any> = new EventEmitter();
	
	  public redirectUrl: string;
	
    public statusLogin: EventEmitter<boolean> = new EventEmitter<boolean>();
     
    private logado  : boolean = false;
    public usuario  : UsuarioLogado = new UsuarioLogado();
    
    public listaModulos: Array<any> = [];

    constructor(_http: HttpClient, _message: MessageService) {
        super(<any>_http, _message);
    }

    public authenticate(params: {}) {

          this.post('authenticate', params).subscribe((usuario : UsuarioLogado ) => {
              localStorage.setItem(AuthService.AUTH_TOKEN,  usuario.token);
              sessionStorage.setItem(AuthService.AUTH_TOKEN, usuario.token);
              this.afterAuthenticate.next(usuario);
        });



        return this.afterAuthenticate;       
    }

    public autenticarUsuario(params: {}): Observable<any> {
      return this.get('auth/autenticar', params)

    };

    public logout() { 
        this.afterAuthenticate.observers = [];
    }

    get isLoggedIn(): boolean {
    
        if(localStorage.getItem(AuthService.AUTH_TOKEN) != undefined){
          return true;
        }else{
          if(sessionStorage.getItem(AuthService.AUTH_TOKEN) != undefined){
            return true;
          }else{
            return false;
          }
        }                
    }

    public efetuarLogin() {
       this.logado   = true;       
    }

    public setCancelRoute(blockRoute : boolean){
      this.blockRoute = blockRoute;
    }

    get getCancelRoute(): boolean {
        return this.blockRoute;
    }

}
