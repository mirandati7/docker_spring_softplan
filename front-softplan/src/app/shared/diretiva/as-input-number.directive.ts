import { AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


/*export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,

    useExisting: forwardRef(() => AsInputTextDirective),
    multi: true

};*/


@Directive({
    selector: '[asInputNumber]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: AsInputNumberDirective,
        multi: true
    }],
    host: {
        '[class.asinput-number]': 'true'
    },

})
export class AsInputNumberDirective implements AfterViewInit, AfterViewChecked, ControlValueAccessor {

    constructor(private _elementRef: ElementRef) {

    }
    @Input('asInputNumber') valor: any;
    @Input() disabled: boolean;

    value: any;

    panel: any;

    filled: boolean;

    onChange: any;

    onTouched: any;

    field: any;

    suggestionsUpdated: boolean;

    initValue: any;

    input: any;



    focus: boolean = false;
    private teste: HTMLInputElement;

    onModelChange: Function = () => { };

    ngAfterViewInit() {
        this.field = document.getElementById(this.valor);

    }
    ngAfterViewChecked() {

        if (this.value !== undefined && !this.initValue) {
            if (this.filled !== undefined) {
                this._elementRef.nativeElement.value = this.filled;
            }

            /*   if( document.activeElement.innerHTML =="Limpar" || document.activeElement.innerHTML =="Salvar" ){
                   this.value = null;
                   this.filled = null;
                   this._elementRef.nativeElement.value = null;

               }*/
        }
    }


    writeValue(value: any): void {
        this.value = value;
        this.filled = this.value && this.value;
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    updateFilledState() {
        this.filled = this.input && this.input.value != '';
    }
    registerOnTouched(fn: Function): void {
        this.onTouched = fn;
    }

    setDisabledState(value: boolean): void {
        this.disabled = value;
    }
    //  @HostListener('input', ['$event'])
    onkeydown(event) {
        event.target.value
        if (event.keyCode < 48) {
            event.keyCode = 0;
        }
        if (event.keyCode > 57 && event.keyCode < 96) {
            event.keyCode = 0;

        }
        if (event.keyCode > 105) {
            event.keyCode = 0;
        }
    }

    @HostListener('input', ['$event'])
    onInput(e) {
        e.target.value
        // event.target.value = event.target.value.replace.replace(/[^0-9]+/g,'');
        if (e.target.value.indexOf('"') >= 0) {
            e.target.value = e.target.value.replace('"', "");
        }
        if (e.target.value.indexOf("'") >= 0) {
            e.target.value = e.target.value.replace("'", "");
        }

        let value = e.target.value;
        this.value = value;

        this.onModelChange(value);
        this.updateFilledState();
    }




}
