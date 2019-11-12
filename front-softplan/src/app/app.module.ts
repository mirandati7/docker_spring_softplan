import { DecimalPipe, HashLocationStrategy, LocationStrategy, registerLocaleData } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import localeBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { ChartModule } from 'primeng/chart';
import { CalendarModule, CardModule, ConfirmationService, ConfirmDialogModule, GrowlModule } from 'primeng/primeng';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { LoginComponent } from "./login/login.component";
import { UsuarioService } from "./seguranca/usuario/usuario.service";
import { AuthGuard } from "./shared/auth/auth.guard";
import { AuthService } from "./shared/auth/auth.service";
import { GlobalsVariablesService } from './shared/service/global-variables.service';
import { MessageService } from './shared/service/message.service';
import { RowMaskService } from './shared/service/row-mask.service';

// the second parameter 'fr' is optional 
registerLocaleData(localeBr, 'pt');

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    GrowlModule,
    CalendarModule,
    AppRoutingModule,
    ConfirmDialogModule,
    CardModule,
    ChartModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent    
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'pt'},
    DashboardService,
    DecimalPipe, 
    RowMaskService, 
    GlobalsVariablesService,     
    AuthService, 
    AuthGuard, 
    CookieService, 
    MessageService,
    UsuarioService,
    ConfirmationService,
  ],
  bootstrap: [
    AppComponent
  ]  
})
export class AppModule {

} 

