import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";

@Component({
    selector: 'workout-time-tracker-runner-dialog',
    templateUrl: './workout-time-tracker-runner-dialog.html',
})
export class WorkoutTimeTrackerRunnerDialog {

    constructor(public dialogRef: MatDialogRef<WorkoutTimeTrackerRunnerDialog>,
        @Inject(MAT_DIALOG_DATA) public tableData: any) {

    }
}

export interface Workout {
    id: number;
    workoutName: string;
    setList: [];
}