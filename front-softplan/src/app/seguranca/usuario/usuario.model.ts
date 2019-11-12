import { GenericModel } from '../../shared/model/generic.model';

export class Usuario extends GenericModel {
    
    public id: number;
    public username: string;    
    public password: string;
    public token:string;

}