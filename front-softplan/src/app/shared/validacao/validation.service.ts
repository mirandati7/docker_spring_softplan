//Original version created by Cory Rylan: https://coryrylan.com/blog/angular-2-form-builder-and-validation-management
import { AbstractControl } from '@angular/forms';

export class ValidationService {

    static emailValidator(control: AbstractControl) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

     static autocompleteValidator(control: AbstractControl) {
        if (control.value != null) {        
            if (control.value.id > 0 ) {       
                return null;
            }else{
                return { 'validar Autocomplete': true };    
            }  
        } else {
            return { 'validar Autocomplete': true };
        }
    }


    static autocompleteValidatorNovo(control: AbstractControl) {

        if (control.value.id > 0 ) {
            return null;
        } else {
            return { 'validar Autocomplete': true };
        }

    }

     static autocompleteValidatorID(control: AbstractControl) {
        if (control.value > 0) {
            return null;
        } else {
            return { 'validar Autocomplete': true };
        }
    }

   static autocompleteValidatorTrue(control: AbstractControl) { 
       let retorno;
       retorno = null;      
        return retorno;        
    }

    static autocompleteValidatorFalse(control: AbstractControl) {       
       return { 'validar Autocomplete': true };
    }



   static dataValidatorTrue(control: AbstractControl) {       
        return null;        
    }

     static dataValidatorFalse(control: AbstractControl) {       
       return { 'validar Calendar': true };
    }

     static dataValidator(control: AbstractControl) {
        if (control.value == null ) {
            return { 'validar Calendar': true };
        
        } else {
                return null;
        }
    }
    
    static passwordValidator(control: AbstractControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static validarCPF(cpf: any) :boolean{
       cpf = !cpf || cpf.replace(/\D/g, '');
        var cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;
        
        if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {
            return false;
        } 
        
        var x = cpf.length - 1;
        var digitosTemp = 0;
        var e = 0;
        var h = '';
        
        for (var i = 0; i <= cpf.length - 3; i++) {
            digitosTemp = cpf.substring(i, i + 1);
            e = e + (digitosTemp * x);
            x -= 1;
            h = h + digitosTemp;
        }
        
        var digitos = 11 - (e % 11);
        if (digitos === 10 || digitos === 11) {
            digitos = 0;
        }

        var cpfSemDigVer = cpf.substring(0, cpf.length - 2) + digitos;
        x = 11;
        e = 0;
        for (var j = 0; j <= (cpf.length - 2); j++) {
            e += (cpfSemDigVer.substring(j, j + 1) * x);
            x -= 1;
        }
        
        var digVerificador = 11 - (e % 11);
        if (digVerificador === 10 || digVerificador === 11) {
            digVerificador = 0;
        }
        
        return ((digitos + '' + digVerificador) === cpf.substring(cpf.length, cpf.length - 2));
     
   }

   static validateCPF(control: AbstractControl) :boolean{

    let cpf = control.value;
    cpf = !cpf || cpf.replace(/\D/g, '');
     var cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;
     
     if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {
         return false;
     } 
     
     var x = cpf.length - 1;
     var digitosTemp = 0;
     var e = 0;
     var h = '';
     
     for (var i = 0; i <= cpf.length - 3; i++) {
         digitosTemp = cpf.substring(i, i + 1);
         e = e + (digitosTemp * x);
         x -= 1;
         h = h + digitosTemp;
     }
     
     var digitos = 11 - (e % 11);
     if (digitos === 10 || digitos === 11) {
         digitos = 0;
     }

     var cpfSemDigVer = cpf.substring(0, cpf.length - 2) + digitos;
     x = 11;
     e = 0;
     for (var j = 0; j <= (cpf.length - 2); j++) {
         e += (cpfSemDigVer.substring(j, j + 1) * x);
         x -= 1;
     }
     
     var digVerificador = 11 - (e % 11);
     if (digVerificador === 10 || digVerificador === 11) {
         digVerificador = 0;
     }
     
     return ((digitos + '' + digVerificador) === cpf.substring(cpf.length, cpf.length - 2));
  
}


  
	/**
     * Valida um CPF.
     *
     * @param cpf valor do cpf a ser validado.
     * @return boolean informando se o cpf é válido ou não.
     */
    static cpfValido(cpf: any): boolean {
                
        cpf = !cpf || cpf.replace(/\D/g, '');
        var cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;
        
        if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {
            return false;
        } 
        
        var x = cpf.length - 1;
        var digitosTemp = 0;
        var e = 0;
        var h = '';
        
        for (var i = 0; i <= cpf.length - 3; i++) {
            digitosTemp = cpf.substring(i, i + 1);
            e = e + (digitosTemp * x);
            x -= 1;
            h = h + digitosTemp;
        }
        
        var digitos = 11 - (e % 11);
        if (digitos === 10 || digitos === 11) {
            digitos = 0;
        }

        var cpfSemDigVer = cpf.substring(0, cpf.length - 2) + digitos;
        x = 11;
        e = 0;
        for (var j = 0; j <= (cpf.length - 2); j++) {
            e += (cpfSemDigVer.substring(j, j + 1) * x);
            x -= 1;
        }
        
        var digVerificador = 11 - (e % 11);
        if (digVerificador === 10 || digVerificador === 11) {
            digVerificador = 0;
        }
        
        return ((digitos + '' + digVerificador) === cpf.substring(cpf.length, cpf.length - 2));
    }


}