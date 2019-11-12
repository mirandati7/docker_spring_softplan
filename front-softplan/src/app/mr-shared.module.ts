import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BreadcrumbComponent } from "./shared/componentes/breadcrumb/breadcrumb.component";
import { AsInputNumberDirective} from "./shared/diretiva/as-input-number.directive";
import { AsInputTextDirective} from "./shared/diretiva/as-input-text.directive";
import { CurrencyMaskModule } from "ngx-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ngx-currency-mask/src/currency-mask.config";
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';

import {
  RadioButtonModule,
  InputTextModule,      
  ToggleButtonModule, 
  DropdownModule,
  InputSwitchModule,  
  ButtonModule,  
  SharedModule, 
  DialogModule,
  ConfirmDialogModule,
  PasswordModule,  
  CheckboxModule,
  EditorModule,
  PanelModule,
  PaginatorModule,
  InputTextareaModule,  
  ListboxModule,
  ToolbarModule,
  AccordionModule, 
  TabViewModule,  
  TreeModule, 
  TreeTableModule,
  TreeNode,    
  LightboxModule,
  ProgressBarModule  
} from "primeng/primeng";

@NgModule({
  declarations: [
    BreadcrumbComponent,        
    AsInputNumberDirective,
    AsInputTextDirective               
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    InputTextModule,
    InputSwitchModule,
    InputMaskModule,    
    DropdownModule,
    AutoCompleteModule,
    ButtonModule,
    TableModule,
    SharedModule,
    ProgressBarModule,
    ConfirmDialogModule,
    PasswordModule,    
    InputTextareaModule,
    CheckboxModule,
    EditorModule,
    PanelModule,
    PaginatorModule,
    CalendarModule,
    DialogModule,
    ListboxModule,
    ToolbarModule,
    AccordionModule,
    TabViewModule,
    TreeModule,
    TreeTableModule,        
    CurrencyMaskModule,
    GalleriaModule,
    FileUploadModule,
    LightboxModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    InputTextModule, 
    InputSwitchModule,
    InputMaskModule,   
    DropdownModule,
    AutoCompleteModule,
    ButtonModule,
    TableModule,
    SharedModule,
    ConfirmDialogModule,
    PasswordModule,    
    InputTextareaModule,
    CheckboxModule,
    EditorModule,
    PanelModule,
    ProgressBarModule,
    PaginatorModule,
    CalendarModule,
    DialogModule,
    ListboxModule, 
    ToolbarModule,   
    AccordionModule,
    TabViewModule,
    TreeModule,
    TreeTableModule,        
    BreadcrumbComponent,        
    AsInputNumberDirective,
    AsInputTextDirective,    
    GalleriaModule,
    FileUploadModule,
    LightboxModule
  ],
  bootstrap: []
  
})
export class MRSharedModule {
  
}



