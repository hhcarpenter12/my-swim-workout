import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";


@Component({
  selector: 'dashboard',
  styleUrls: ['dashboard.component.scss'],
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

showJU: boolean;
showRPT: boolean;
showTimeTracker: boolean;

  constructor(public dialog: MatDialog,
              private router: Router) {
   }

  ngOnInit() {

  }

  navigateToJU()
  {
    this.router.navigate(['/urbanchek-aerobic']);
  }
  
  navigateToRPT()
  {
    this.router.navigate(['/race-pace-tracker']);
  }

  navigateToTimeTracker()
  {
    this.router.navigate(['/workout-time-tracker']);
  }

  toggleTimeTracker() {
    this.showTimeTracker = ! this.showTimeTracker;
  }

  toggleRPT() {
    this.showRPT = ! this.showRPT;
  }

  toggleJU() {
    this.showJU = ! this.showJU;
  }


}

