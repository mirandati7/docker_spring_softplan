
export class Util {
     
      static formatarValorNumerico(valor: Number) {
       
       var valorFormatado: String = String(valor);
        var i= 0;

        while(( i = valorFormatado.indexOf(".", i)) != -1)  {
             valorFormatado = valorFormatado.replace('.','');             
        }   

        valorFormatado = valorFormatado.replace(',','.');
        return valorFormatado;
    }

      static formatarValorMonetario(valor: Number) {
       
       var valorFormatado: String = String(valor);
        var i= 0;

        while(( i = valorFormatado.indexOf(".", i)) != -1)  {
             valorFormatado = valorFormatado.replace('.','');             
        }   

        valorFormatado = valorFormatado.replace(',','.');
        return valorFormatado;
    }

    static formatarValorComVirgula(valor: Number) {
       
       var valorFormatado: String = String(valor);
        var i= 0;
        
        valorFormatado = valorFormatado.replace('.',',');
        return valorFormatado;
    }
    static formatarValorComPonto(valor: Number) {
        
        var valorFormatado: String = String(valor);
         var i= 0;
         
         valorFormatado = valorFormatado.replace(',','.');
         return valorFormatado;
     }

     static ajustarValoresNulos(valor: any){

        if(valor == NaN){
            valor = 0
        }
        if(valor == undefined){
            valor = 0
        }
        if(valor == null){
            valor = 0
        }
        if(valor == ""){
            valor = 0
        }
        return valor;
    }
    
    static removerAspas(valor: any){
        
        var valorFormatado 
        valorFormatado = valor.replace('""','');
        valorFormatado = valorFormatado.replace(',', '.');
        valorFormatado = (Number(valorFormatado));
      
        return valorFormatado;
    }

    static formatarData(date, separator){
        let d:String = '';
        let m:String = '';
        let newDate = new Date(Date.parse(date));
        let day = Number(`${newDate.getDate()}`);
        let mouth = Number(`${newDate.getMonth()+1}`);
        let y = String(`${newDate.getFullYear()}`);

        if(day < 10){
            d = '0' + day;
        }else{
            d = String(day);
        }
        if(mouth < 10){
            m = '0' + mouth;
        }else{
            m = String(mouth);
        }
        let dateFormatted = d+separator+m+separator+y;
        return dateFormatted;
    }

    static disabledElements(tipo:any){
        let elements = document.querySelectorAll(tipo);
        let quant = elements.length;
        if(quant > 0){
            let i = 0;
            while( quant > 0){
                elements[i].disabled = true;
                i++;
                quant--;
            }
            this.enabledElements(".btnVoltar");
            this.enabledElements(".ng-tns-c1-0"); //botões de modal [sair: sim,não]
        }
    }

    static enabledElements(tipo:any){
        let elements = document.querySelectorAll(tipo);
        let quant = elements.length;
        if(quant > 0){
            let i = 0;
            while( quant > 0){
                elements[i].disabled = false;
                i++;
                quant--;
            }
        }
    }

    
    static traducaoDataCalendar() {
        let pt_BR: any;
        pt_BR = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            dayNamesMin: ["Do","Se","Te","Qa","Qi","Sx","Sa"],
            monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
            monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
            today: 'Hoje',
            clear: 'Limpar'
        }


        return pt_BR;
    } 
    


}
