import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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


@NgModule({
  declarations: [
    AppComponent,
    SncTableComponent,
    HomeComponent,
    BuscaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MaterialModule,
  ],
  providers: [SlcApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
