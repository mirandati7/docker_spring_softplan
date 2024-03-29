
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { GenericModel } from '../../shared/model/generic.model';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { MessageService } from '../../shared/service/message.service';
import { Util } from '../../utilitarios/util';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';
import { ValidationService } from '../../shared/validacao/validation.service';
import { SelectItem } from '../../shared/primeng/common/api';

@Component({
    templateUrl: './pessoa-detail.component.html',
})

export class PessoaDetailComponent<T extends GenericModel> implements OnInit {

    public id: string;
    apiEndPointUpload = this._pessoaService._endpoint;
    public cpfValido:any;

    breadcrumb: BreadcrumbModel = new BreadcrumbModel("Administrativo", "Pessoa", "Cadastro");
    pt_BR: any;

    sexos: SelectItem[];
    sexo: any;



    constructor(public _route: ActivatedRoute,
        public _router: Router,
        public _messages: MessageService,
        public fb: FormBuilder,
        public _pessoaService: PessoaService,
         public _http: HttpClient,
        public http: HttpClient,
        public globalsVariablesService: GlobalsVariablesService) {

        this.sexos = [];
        this.sexos.push({ label: 'Masculino', value: 1 });
        this.sexos.push({ label: 'Feminino',  value: 2 });

    }

    images: any[];

    model: Pessoa = new Pessoa();
    pessoaForm: FormGroup;
    ativo: boolean = true;
    inativo: boolean = false;
    msgs: String[];

    ngOnInit() {

        this.pt_BR = Util.traducaoDataCalendar();
        this.buildForm();

        this._route.params.forEach((params: Params) => {
            this.id = String(+params['id']);
        });

        if (this.id == 'NaN') {
            this.limpar();

        }
        else {
            this._pessoaService.findOne(Number(this.id)).subscribe(model => {
                this.model = model;
                this.pessoaForm.patchValue(this.model);
            });

        }

        document.getElementById('cpf').focus();

    }


    buildForm(): void {
        this.pessoaForm = this.fb.group({
            'id': [''],
            'nome': ['',[Validators.required]],
            'sexo': [''],
            'email': [''],
            'dataNascimento': [''],
            'cpf': [''],
            'naturalidade': [''],
            'nacionalidade': ['']

        });

        this.pessoaForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.pessoaForm) { return; }
        const form = this.pessoaForm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + '';
                }
            }
        }
    }

    formErrors = {
        'nome': '',
        'sexo': '',
        'email': '',
        'dataNascimento': '',
        'cpf': '',
        'naturalidade': '',
        'nacionalidade': ''
    };
    validationMessages = {
        'nome': {
            'required': 'Nome é obrigatório!',
        }

    }



    onBeforeSave() {
        this.model = this.pessoaForm.value;
    }




    public limpar() {

        this.model = new Pessoa();
        this.pessoaForm.reset();
        this.buildForm();
        document.getElementById('nome').focus();
    }

    public save() {

        this.onBeforeSave();



        if (this.pessoaForm.valid) {
            if (this.model.id == 0 || this.model.id == null) {

                this._pessoaService.save(this.model).subscribe(res => {
                    if (res == 0 ){
                        this._messages.info("Já existe um registro com este CPF !");
                    }else{
                        this._messages.success("Registro salvo com sucesso !");
                    }

                    this.limpar();
                })
            }
            else {
                this._pessoaService.save(this.model).subscribe(res => {
                    if (res == 0 ){
                        this._messages.info("Já existe um registro com este CPF !");
                    }else{
                        this._messages.success("Registro alterado com sucesso!");
                    }
                    this.limpar();
                })
            }
        }
        else {
            this._messages.info("Para salvar preencha os campos assinalados");
        }
    }

    public back() {
        this._router.navigate(['/administrativo/pessoa']);
    }

    public cancel() {
        this.back();
    }

    /*
    public getRequestOptions(): any {
        let headers = new Headers();
        headers.append('Accept', 'application/json');

        let authToken = localStorage.getItem('authToken');
        if (authToken)
            headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });
        return options;
    }
    */

    public getRequestOptions(): any {

      let authToken = localStorage.getItem('authToken');
      let headersRequest = new HttpHeaders();
      headersRequest = headersRequest.set('Authorization', `Bearer ${authToken}`).set('Accept', 'application/json');

      return { headers: headersRequest };
    }
    disabledElements(tipo: any) {
        let elements = document.querySelectorAll(tipo);
        let quant = elements.length;
        if (quant > 0) {
            let i = 0;
            while (quant > 0) {
                elements[i].disabled = true;
                i++;
                quant--;
            }
        }
    }

    enabledElements(tipo: any) {
        let elements = document.querySelectorAll(tipo);
        let quant = elements.length;
        if (quant > 0) {
            let i = 0;
            while (quant > 0) {
                elements[i].disabled = false;
                i++;
                quant--;
            }
        }
    }



}




