import {GenericModel} from '../../shared/model/generic.model';

export class UsuarioLogado extends GenericModel {
    
    public id: number;
    public login: string;
    public senha: string;
    public token:string;

}