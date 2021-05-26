import { AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[asInputText]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: AsInputTextDirective,
        multi: true
    }],
    host: {
        '[class.asinput-text]': 'true'
    },

})
export class AsInputTextDirective implements AfterViewInit, AfterViewChecked, ControlValueAccessor {

    constructor(private _elementRef: ElementRef) {

    }
    @Input('asInputText') valor: any;
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

    @HostListener('input', ['$event'])
    onInput($event: any) {
        $event.target.value
        $event.target.value = $event.target.value.replace(/[^a-zA-Z0-9.%" "/\-]/g, "");
        if ($event.target.value.indexOf('"') >= 0) {
            $event.target.value = $event.target.value.replace('"', "");
        }
        if ($event.target.value.indexOf("'") >= 0) {
            $event.target.value = $event.target.value.replace("'", "");
        }

        let value = $event.target.value;
        this.value = value;

        this.onModelChange(value.toUpperCase());
        this.updateFilledState();
    }

}
