import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Injectable()
export class RowMaskService {
    constructor(public numberPipe: DecimalPipe) {         
    }

    rowMask(row, col, mask){
        let value:any;
        switch(col.type){
            case 'number': 
                value = this.numberPipe.transform(row[col.field], mask);
                return value;
            case 'Number': 
                value = this.numberPipe.transform(row[col.field], mask);
                return value;
            case 'boolean': 
                if(row[col.field]) value = 'SIM'; else value = 'NÃO'; 
                return value;
            case 'Boolean':
                if(row[col.field]) value = 'SIM'; else value = 'NÃO';
                return value;
            case 'string': 
                return row[col.field];
            case 'String': 
                return row[col.field];                                                                                
            default: 
                return row[col.field];
        }
        
    }


}