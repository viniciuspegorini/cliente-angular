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

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from './app-routing.module';
import { GeneroComponent } from './genero/genero.component';
import { GeneroService } from './genero/genero.service';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoraComponent } from './produtora/produtora.component';
import { ProdutoraService } from './produtora/produtora.service';
import { SerieComponent } from './serie/serie.component';
import { SerieService } from './serie/serie.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexComponent,
    GeneroComponent,
    ProdutoraComponent,
    SerieComponent
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
    DialogModule
  ],
  providers: [
    GeneroService,
    ProdutoraService,
    ConfirmationService,
    SerieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
