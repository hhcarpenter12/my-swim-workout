import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';
import { ConvertTimeUtilityComponent } from 'src/app/convertTimeUtility.component';

@Component({
    selector: 'workout-time-tracker-dialog',
    templateUrl: './workout-time-tracker-dialog.html',
})
export class WorkoutTimeTrackerDialog {

    workoutName = "";
    Reps: number;
    Distance: number;
    Description: string;
    TimeIntervalMinutes: number;
    TimeIntervalSeconds: number;
    fixedSeconds: string;
    yardage: number;
    completionTimeSeconds: number;
    completionTime: string;
    setList: any;
    todoObj: any;
    // nameControl = new FormControl("", [Validators.pattern('^[a-zA-Z0-9 ]+$')])
    descControl = new FormControl("", [Validators.pattern('^[a-zA-Z0-9 ]+$')])

    constructor(public dialogRef: MatDialogRef<WorkoutTimeTrackerDialog>,
        @Inject(MAT_DIALOG_DATA) public tableData: any,
        private convertTimeUtility: ConvertTimeUtilityComponent) {
        this.yardage = 0;
        this.Reps = 0;
        this.Distance = 0;
        this.Description = '';
        this.TimeIntervalMinutes = 0;
        this.TimeIntervalSeconds = 0;
        this.completionTimeSeconds = 0;

        this.setList = [];
    }

    deleteSet(index) {
        for (let i = 0; i < this.setList.length; i++) {
            if (i == index) {
                let todoObj = this.setList[i];

                for (let i = 0; i < todoObj.Reps; i++) {

                    this.yardage -= todoObj.Distance;

                    let totSecs = this.convertTimeUtility.determineSecondFormatting(todoObj.TimeIntervalMinutes, todoObj.TimeIntervalSeconds);

                    this.completionTimeSeconds -= totSecs;
                    this.completionTime = this.convertTimeUtility.convertTimeSec(this.completionTimeSeconds)
                }
            }
        }

        this.setList.splice(index, 1);
    }

    generateWorkout() {

        let id = 0;

        if (this.tableData.data != undefined &&
          this.tableData.data.data != undefined) {
          id = this.tableData.data.data.length;
        }

        let workout = {
            id: id,
            workoutName: this.workoutName,
            completionTime: this.completionTime,
            yardage: this.yardage,
            setList: this.setList
        }

        const myData = this.tableData.data.data;
        console.log(myData)


        myData.push(workout);
        this.tableData.data.data = myData;
        this.dialogRef.close();
    }

    getYardageDuration(todoObj) {
        for (let i = 0; i < todoObj.Reps; i++) {

            this.yardage += todoObj.Distance;

            let totSecs = this.convertTimeUtility.determineSecondFormatting(todoObj.TimeIntervalMinutes, todoObj.TimeIntervalSeconds);

            this.completionTimeSeconds += totSecs;

            this.completionTime = this.convertTimeUtility.convertTimeSec(this.completionTimeSeconds);
        }
    }

    addSet() {
        this.todoObj = {
            Reps: this.Reps,
            Distance: this.Distance,
            Description: this.Description,
            TimeIntervalMinutes: this.TimeIntervalMinutes,
            TimeIntervalSeconds: this.convertTimeUtility.fixSeconds(this.TimeIntervalSeconds)
        }

        this.setList.push(this.todoObj);
        this.getYardageDuration(this.todoObj);
    }
}

export interface Workout {
    id: number;
    workoutName: string;
    completionTime: string;
    yardage: string;
    setList: [];
}