import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RacePaceTrackerDialog } from './race-pace-tracker/race-pace-tracker-dialog/race-pace-tracker-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { routingComponents } from './app-routing.module';
import { UrbanchekAerobicDialog } from './urbanchek-aerobic/urbanchek-aerobic/urbanchek-aerobic-dialog';
import { WorkoutTimeTrackerDialog } from './workout-time-tracker/workout-time-tracker-dialog/workout-time-tracker-dialog';
import { WorkoutTimeTrackerRunnerDialog } from './workout-time-tracker/workout-time-tracker-runner-dialog/workout-time-tracker-runner-dialog';

@NgModule({
  declarations: [
    routingComponents,
    RacePaceTrackerDialog,
    UrbanchekAerobicDialog,
    WorkoutTimeTrackerDialog,
    WorkoutTimeTrackerRunnerDialog
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule
  ],

  providers: [FormsModule],
  bootstrap: [AppComponent],
  entryComponents: [RacePaceTrackerDialog, UrbanchekAerobicDialog, WorkoutTimeTrackerDialog, WorkoutTimeTrackerRunnerDialog]
})

export class AppModule { }
