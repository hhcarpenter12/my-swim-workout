import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacePaceTrackerComponent } from './race-pace-tracker/race-pace-tracker.component';
import { DashboardComponent } from 'src/app/dashboard.component';
import { AppComponent } from './app.component';
import { AerobicTrainingComponent } from './urbanchek-aerobic/urbanchek-aerobic.component';
import { WorkoutTimeTrackerComponent } from './workout-time-tracker/workout-time-tracker.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'race-pace-tracker', component: RacePaceTrackerComponent, pathMatch: 'full' },
  { path: 'urbanchek-aerobic', component: AerobicTrainingComponent, pathMatch: 'full' },
  { path: 'workout-time-tracker', component: WorkoutTimeTrackerComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent, RacePaceTrackerComponent, AppComponent, AerobicTrainingComponent, WorkoutTimeTrackerComponent
]
