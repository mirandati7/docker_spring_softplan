import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth/auth.service';
import { GlobalsVariablesService } from '../shared/service/global-variables.service';
import { UsuarioLogado } from '../seguranca/usuario/usuario-logado.model';
import { UsuarioService } from '../seguranca/usuario/usuario.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../shared/service/message.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.css',
        './login.responsive.css'
    ]
}) 
export class LoginComponent {
  
    public loginModel: any = {};
    public statusLogin: boolean = true;
    private usuarioLogado: UsuarioLogado = new UsuarioLogado();
    public authToken;
    public errors;

    constructor(
        public _router: Router,
        public _messageService: MessageService,
        public _authService: AuthService,
        public _usuarioService: UsuarioService,
        public globalsVariablesService: GlobalsVariablesService,
        public cookieService: CookieService
    )
    {
        document.querySelector('body').classList.add('backLogin');
    }

    public logar() {
        this._authService.authenticate(this.loginModel).subscribe(res => {
            //this.authToken = res.data;
            this.authToken = res.token;

            document.querySelector('body').classList.remove('backLogin');
        
            this._authService.autenticarUsuario(this.loginModel).subscribe(res => {
  
                
                this.usuarioLogado = res;
                if(this.usuarioLogado.login != '' && this.usuarioLogado.login != 'undefined'){
                        this.globalsVariablesService.setGlobalsVariables(this.usuarioLogado);
                        this.cookieService.set( 'user', JSON.stringify(this.loginModel), 365);
                        this._router.navigate(['/dashboard']);
                }           
            });

        }, error => {
            this.errors = error;
            this._messageService.error('Usuário ou senha incorretos. Por favor tente novamente.');
        });

    }
    
}