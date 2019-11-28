import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
      RouterModule.forRoot(
        appRoutes)
      // other imports here
  ],
  providers: [],
  bootstrap: [AppComponent]
})

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/my-swim-workout',
    pathMatch: 'full'
  }
];

export class AppModule { }
