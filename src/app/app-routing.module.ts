import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RacePaceTrackerComponent} from './race-pace-tracker/race-pace-tracker.component';
import { DashboardComponent } from 'src/app/dashboard.component';
import { AppComponent } from './app.component';
import { AerobicTrainingComponent } from './urbanchek-aerobic/urbanchek-aerobic.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path:'race-pace-tracker', component: RacePaceTrackerComponent},
  {path:'urbanchek-aerobic', component: AerobicTrainingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent, RacePaceTrackerComponent, AppComponent, AerobicTrainingComponent]
