import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MaterialModule } from './material/material.module';

import { SlcApiService } from './slc-api.service';

import { AppComponent } from './app.component';
import { SncTableComponent } from './snc-table/snc-table.component';


@NgModule({
  declarations: [
    AppComponent,
    SncTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MaterialModule,
  ],
  providers: [SlcApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
