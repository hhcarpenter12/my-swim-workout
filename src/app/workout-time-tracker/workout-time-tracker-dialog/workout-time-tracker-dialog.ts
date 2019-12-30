import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";

@Component({
    selector: 'workout-time-tracker-dialog',
    templateUrl: './workout-time-tracker-dialog.html',
})
export class WorkoutTimeTrackerDialog {

    workoutName: string;
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

    constructor(public dialogRef: MatDialogRef<WorkoutTimeTrackerDialog>,
        @Inject(MAT_DIALOG_DATA) public tableData: any) {
        this.yardage = 0;
        this.Reps = 0;
        this.Distance = 0;
        this.Description = '';
        this.TimeIntervalMinutes = 0;
        this.TimeIntervalSeconds = 0;
        this.completionTimeSeconds = 0;

        this.setList = [];
    }

    fixSeconds() {
        let fixedSeconds = "";

        if (this.TimeIntervalSeconds <= 9 &&
            this.TimeIntervalSeconds >= 0) {
            fixedSeconds = "0" + this.TimeIntervalSeconds;
        }
        else {
            fixedSeconds = this.TimeIntervalSeconds + "";
        }

        return fixedSeconds;
    }

    deleteSet(index) {
        for (let i = 0; i < this.setList.length; i++) {
            if (i == index) {
                let todoObj = this.setList[i];

                for (let i = 0; i < todoObj.Reps; i++) {

                    this.yardage -= todoObj.Distance;

                    let totSecs = (Number.parseInt(todoObj.TimeIntervalMinutes) * 60);

                    if (todoObj.TimeIntervalSeconds.charAt(0) == '0') {
                        totSecs += Number.parseInt(todoObj.TimeIntervalSeconds.charAt(1));
                    }
                    else {
                        totSecs += Number.parseInt(todoObj.TimeIntervalSeconds);
                    }

                    this.completionTimeSeconds -= totSecs;
                    this.completionTime = this.convertTimeToMinutesSeconds(this.completionTimeSeconds);
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

        myData.push(workout);
        this.tableData.data.data = myData;
        this.dialogRef.close();
    }

    getYardageDuration(todoObj) {
        for (let i = 0; i < todoObj.Reps; i++) {

            this.yardage += todoObj.Distance;

            let totSecs = (Number.parseInt(todoObj.TimeIntervalMinutes) * 60);

            if (todoObj.TimeIntervalSeconds.charAt(0) == '0') {
                totSecs += Number.parseInt(todoObj.TimeIntervalSeconds.charAt(1));
            }
            else {
                totSecs += Number.parseInt(todoObj.TimeIntervalSeconds);
            }

            this.completionTimeSeconds += totSecs;

            this.completionTime = this.convertTimeToMinutesSeconds(this.completionTimeSeconds);
        }
    }

    convertTimeToMinutesSeconds(seconds) {
        var h = Math.floor(seconds / 3600)
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.round(((seconds % 3600 % 60) * 100)) / 100;

        let formattedSeconds = s + "";

        if (s < 10) {
            formattedSeconds = "0" + s;
        }

        let formattedMinutes = m + "";

        if (m < 10)
        {
            formattedMinutes = "0" + m;
        }


        return  h + ":" + formattedMinutes + ":" + formattedSeconds;
    }

    addSet(event) {
        this.todoObj = {
            Reps: this.Reps,
            Distance: this.Distance,
            Description: this.Description,
            TimeIntervalMinutes: this.TimeIntervalMinutes,
            TimeIntervalSeconds: this.fixSeconds()
        }

        this.setList.push(this.todoObj);
        this.getYardageDuration(this.todoObj);
        event.preventDefault();
    }
}

export interface Workout {
    id: number;
    workoutName: string;
    completionTime: string;
    yardage: string;
    setList: [];
}