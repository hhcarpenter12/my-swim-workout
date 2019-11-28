import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from './_alert';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MultiAlertsComponent } from './multi-alerts';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MultiAlertsComponent
  ],
  imports: [
    AlertModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot(
      appRoutes
    ),
    PdfViewerModule,
    MatIconModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/SwimWorkoutCreator',
    pathMatch: 'full'
  },
];


export class AppModule { }
