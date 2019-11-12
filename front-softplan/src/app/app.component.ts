import { Component, ViewEncapsulation,EventEmitter,HostListener, OnInit} from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, RoutesRecognized } from '@angular/router';
import { MessageService } from './shared/service/message.service';
import { AuthService } from './shared/auth/auth.service';
import { ConfirmationService } from 'primeng/primeng';
import { GlobalsVariablesService } from './shared/service/global-variables.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './app.responsive.css'
  ]  ,
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit{
  teste : String;
  closeSession = false;
  private pageEnter:Boolean = false;
  pagesActive:any;
  refresh:number = 0;
  refresh_ondestroy : Number;
  pagesActiveStr;
  rotaAnterior;
  rotaAtual;
  keypressCode;
  windowSize: Number;
  usuarioLogado = Object();
  private limitePaginas:number = 5;
  private user:string = '';
  private login = {
    login     : '',
    password  : ''
  };
  

  constructor(
    public _router: Router,
    public activatedRoute: ActivatedRoute,
    public _messageService: MessageService,
    public authService: AuthService,
    public _confirmationService: ConfirmationService,
    public globalsVariablesService: GlobalsVariablesService,
    public cookieService: CookieService) {
  } 

  ngOnInit() {
    this.saveCurrentRoute();
  }

  @HostListener('window:load', ['$event'])
  onload(event) {
    this.refresh = performance.navigation.type;
    this.enter();
  }

  private enter(){

    this.pagesActiveStr = localStorage.getItem("PagesActive");
    this.pagesActive = parseInt(this.pagesActiveStr);

    if(this.refresh != 1){
      this.newPage();
      this.verificarAutenticacao();
      this.pageEnter = true;
    }else{
      if(this.refresh == 1){
        this.refreshPage();
        this.pageEnter = true;
      }
    } 

  }

  private newPage(){
    if(this.pagesActive == null || this.pagesActive == 0 || isNaN(this.pagesActive)){
      //primeiro acesso - primeira aba ativa
      this.pagesActive = 1;
      this.pagesActiveStr = this.pagesActive;
      this.pagesActiveStr.toString();
      sessionStorage.setItem("firstPage","yes");
    }else{
      //Pega o histórico de abas abertas e soma +1 para gravar a atividade da aba atual
      this.pagesActive++;
      this.pagesActiveStr = this.pagesActive.toString();
    }
    //atualiza o saldo de abas ativas no LOCALSTORAGE
    localStorage.setItem("PagesActive",this.pagesActive);
  }

  private refreshPage(){
    this.listarSetups();
    this.pagesActive++;

    if(isNaN(this.pagesActive)){
      this.pagesActive = 1;
    }

    localStorage.setItem("PagesActive",this.pagesActive);

    //RECUPERA OS DADOS DE PERMISSAO DO USUÁRIO QUANDO DADO UM REFRESH 
    let usuarioLogado = sessionStorage.getItem("usuarioLogado");

    if(usuarioLogado != null && usuarioLogado != "{}"){
      sessionStorage.removeItem("usuarioLogado");
      localStorage.removeItem("usuarioLogado");
      //MONTANDO STORAGE COM AS PERMISSOES
      let authToken = sessionStorage.getItem("authToken");
      if(authToken != null){
        localStorage.setItem("authToken", authToken);
        this.usuarioLogado = JSON.parse(usuarioLogado);
        this.user = this.cookieService.get('user');
        if(this.user == ''){
          this.login.login = this.usuarioLogado.login;
          this.login.password = this.usuarioLogado.senha;
          this.cookieService.set('user', JSON.stringify(this.login), 365);
        }
        this.globalsVariablesService.setGlobalsVariables(this.usuarioLogado);
      }else{
        authToken = localStorage.getItem("authToken");
        if(authToken != null){
          sessionStorage.setItem("authToken", authToken);
          this.usuarioLogado = JSON.parse(usuarioLogado);
          this.user = this.cookieService.get('user');
          if(this.user == ''){
            this.login.login = this.usuarioLogado.login;
            this.login.password = this.usuarioLogado.senha;
            this.cookieService.set('user', JSON.stringify(this.login), 365);
          }
          this.globalsVariablesService.setGlobalsVariables(this.usuarioLogado);
        }else{
          this.resetSessao();
        }
      }
    }else{
      this.verificarAutenticacao();
    }

    //QUANDO O REFRESH FOR FEITO ATRAVÉS DO BOTÃO ATUALIZAR DA PÁGINA
    if(this.pagesActiveStr == null){
      localStorage.setItem("PagesActive","1");
      let rotaAnterior = this.getRoute();
      if(rotaAnterior == "/login"){
        this.resetSessao();
      }else{
        //QUANDO REFRESH FEITO EM ALGUMA OUTRA PÁGINA ATIVA
        if(rotaAnterior == null){
          this._router.navigate(['/dashboard']);
        }
      }
    }
  }

  private verificarAutenticacao(){
    if(this.pagesActive == null || this.pagesActive == 0 || isNaN(this.pagesActive)){
      this.pagesActive = 1;
      this.pagesActiveStr = this.pagesActive;
      this.pagesActiveStr.toString();
    }
    if(this.authService.isLoggedIn == false){
      this.resetSessao();
    }else{
      if(this.globalsVariablesService.getPermissaoSuccess == false){
        this.recuperarSessao();
      }
    }
  }

  private verificarLogin(){
    let validAuth = true;
    let auth:any = localStorage.getItem("authToken");
    if(auth == null || auth == '') validAuth = false;
    if(this._router.url == '/login'){
      if(this.authService.isLoggedIn){
        if(this.globalsVariablesService.getPermissaoSuccess){
          this.usuarioAutenticado();
        }else{
          this.recuperarSessao();
          this.usuarioAutenticado();
        }
      }
    }else{
      if(validAuth) this.verificarAutenticacao(); else this.resetSessao();
    }
  }

  private usuarioAutenticado(){
    let pagesActive = localStorage.getItem("PagesActive");
    this.pagesActive = parseInt(pagesActive) + 1;
    localStorage.setItem("PagesActive",this.pagesActive.toString());
    document.querySelector('body').classList.remove('backLogin');
    this._router.navigate(['/dashboard']);
  }

  private recuperarSessao(){
    //CASO TIVER AUTENTICAÇÃO VOLTA COM AS PERMISSÕES DO USUÁRIO
    this.user = this.cookieService.get('user');
    sessionStorage.removeItem("usuarioLogado");
    localStorage.removeItem("usuarioLogado");
    let login = JSON.parse(this.user);
    this.authService.autenticarUsuario(login).subscribe(res => {
      this.usuarioLogado = res;
      this.globalsVariablesService.setGlobalsVariables(this.usuarioLogado);
    });
    
  }

  private resetSessao(){
      sessionStorage.clear();
      localStorage.clear();
      localStorage.setItem("PagesActive","1");
      this.cookieService.delete('user');
      this.globalsVariablesService.blockedGlobalsVariables();
      this._router.navigate(['/login']);
  }

  private logout() {
    this._confirmationService.confirm({
      message: 'Tem certeza que deseja sair do sistema ?',
      header: 'SOFTPLAN',
      icon: 'fa fa-power-off',
      accept: () => {
        this.resetSessao();
        this.authService.logout();
      }
    });
  }

  
  private saveCurrentRoute(){
    let rotaAtual = this._router.url;
    sessionStorage.setItem("rota",rotaAtual);
  }

  private getRoute(){
    return sessionStorage.getItem("rota");
  }
  
  public listarSetups() {
  
  }

  public carregarInformacoesSetup(res) {    
  }

  
 
  
}