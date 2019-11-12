export  class BreadcrumbModel {
    modulo:string;
    funcionalidade:string;
    operacao:string;

    constructor(modulo:string,funcionalidade:string,operacao:string) {
        this.modulo         = modulo;
        this.funcionalidade = funcionalidade;
        this.operacao       = operacao;
      
    }

}