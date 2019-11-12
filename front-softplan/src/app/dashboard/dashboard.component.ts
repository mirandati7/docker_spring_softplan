import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsVariablesService } from '../shared/service/global-variables.service';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    usuarioPermissao;
    public dashboard = new Dashboard();
    private idPatio:number;
    public filtro: FormGroup;
    public pt_BR:any;
    public version: string = environment.version;

    public numeroVagas:number;
	public numeroVagasAlocadas:number;
	public numeroVagasDisponiveis:number;
    public valorRecebido:number;
    

    constructor(
        private router: Router,
        private _dashboardService: DashboardService,
        private fb: FormBuilder,
        public globalsVariablesService: GlobalsVariablesService) 
    {
        this.buildForm();
    }

  

    ngOnInit() {

        this.atualizarDados();
    }

    buildForm(): void {
    }

    atualizarDados() {
        /***
         *  Passando fixo depois alterar para ter uma autocomplete para escolher o Patio
         * 
         *  */ 
        this.idPatio = 1;
        this._dashboardService.total(this.idPatio).then(res => {
            this.dashboard = res;
        });

       
    }


  

}

