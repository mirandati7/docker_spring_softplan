
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreadcrumbModel } from '../../shared/componentes/breadcrumb/breadcrumb.model';
import { GenericModel } from '../../shared/model/generic.model';
import { GlobalsVariablesService } from '../../shared/service/global-variables.service';
import { MessageService } from '../../shared/service/message.service';
import { Util } from '../../utilitarios/util';
import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';
import { ValidationService } from '../../shared/validacao/validation.service';
import { ValidateBrService } from 'angular-validate-br';

@Component({
    templateUrl: './pessoa-detail.component.html',
})

export class PessoaDetailComponent<T extends GenericModel> implements OnInit {

    public id: string;
    apiEndPointUpload = this._pessoaService._endpoint;
    public cpfValido:any;

    breadcrumb: BreadcrumbModel = new BreadcrumbModel("Administrativo", "Pessoa", "Cadastro");
    pt_BR: any;

    constructor(public _route: ActivatedRoute,
        public _router: Router,
        public _messages: MessageService,
        public fb: FormBuilder,
        public _pessoaService: PessoaService,
         public _http: Http,
        public http: HttpClient,
        public globalsVariablesService: GlobalsVariablesService,
        private validateBrService: ValidateBrService
    ) {

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
            'nome': [''],
            'sexo': [''],
            'email': [''],
            'dataNascimento': [''],
            'cpf': ['',[this.validateBrService.cpf]],
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
            'required': 'Codigo é obrigatório!',
            'minlength': 'Descrição no mínimo 4 caracteres !',
            'maxlength': 'Descrição no máximo 24 caracteres !'
        },        
        'cpf': {
            'required': 'CNPJ/Cpf é obrigatório ser valido '
        }
    }
 
    public validarCpf(event) {

        if (event.currentTarget.value.length > 0) {

            this.pessoaForm.get('cpf').validator = Validators.minLength(14);
            this.cpfValido = ValidationService.validarCPF(event.currentTarget.value);
            this.pessoaForm.get('cpf').validator = Validators.required;

            if (this.cpfValido == true) {
                this.pessoaForm.controls.cpf.setErrors(null);
                document.getElementById('cpf').setAttribute('required', 'true');

            } else {
                this.pessoaForm.controls.pessoaCnpjCpf.setErrors({ 'incorrect': true });
                document.getElementById('cpf').setAttribute('required', 'true');

            }
        } else {
            this.pessoaForm.get('cpf').clearValidators();
            document.getElementById('cpf').classList.remove('ng-invalid');
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
                    this._messages.success("Registro salvo com sucesso!");
                    this.limpar();
                })
            }
            else {
                this._pessoaService.save(this.model).subscribe(res => {
                    this._messages.success("Registro alterado com sucesso!");
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

  
    public getRequestOptions(): any {
        let headers = new Headers();
        headers.append('Accept', 'application/json');

        let authToken = localStorage.getItem('authToken');
        if (authToken)
            headers.append('Authorization', `Bearer ${authToken}`);

        let options = new RequestOptions({ headers: headers });
        return options;
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




