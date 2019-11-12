import { GenericModel } from '../../shared/model/generic.model';

export class Pessoa extends GenericModel {

    public id                 : number;
    public nome               : String;
    public sexo               : String;    
    public email              : String;  
    public dataNascimento     : Date; 
    public cpf                : String;
    public naturalidade       : String;
    public nacionalidade      : String;

}
