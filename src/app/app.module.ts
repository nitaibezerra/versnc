import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { SlcApiService } from './slc-api.service';

import { AppComponent } from './app.component';
import { SncTableComponent } from './snc-table/snc-table.component';
import { HomeComponent } from './home/home.component';
import { BuscaComponent } from './busca/busca.component';
import { MenuComponent } from './menu/menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    SncTableComponent,
    HomeComponent,
    BuscaComponent,
    MenuComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    HttpModule,
  ],
  providers: [SlcApiService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
