import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private router: Router) {
   }

  ngOnInit() {

  }
}

