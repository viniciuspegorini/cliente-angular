import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Imports PrimeNG
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {GrowlModule} from 'primeng/growl';
import {DialogModule} from 'primeng/dialog';
import {ConfirmationService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PanelModule} from 'primeng/panel';
import {SpinnerModule} from 'primeng/spinner';
import {FileUploadModule} from 'primeng/fileupload';
import {TabViewModule} from 'primeng/tabview';



import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from './app-routing.module';
import { GeneroComponent } from './genero/genero.component';
import { GeneroService } from './genero/genero.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProdutoraComponent } from './produtora/produtora.component';
import { ProdutoraService } from './produtora/produtora.service';
import { SerieComponent } from './serie/serie.component';
import { SerieService } from './serie/serie.service';
import { from } from 'rxjs';
import { HttpClientInterceptor } from './http-client.interceptor';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexComponent,
    GeneroComponent,
    ProdutoraComponent,
    SerieComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    ConfirmDialogModule,
    GrowlModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    AutoCompleteModule,
    PanelModule,
    SpinnerModule,
    FileUploadModule,
    TabViewModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    },
    GeneroService,
    ProdutoraService,
    ConfirmationService,
    SerieService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
