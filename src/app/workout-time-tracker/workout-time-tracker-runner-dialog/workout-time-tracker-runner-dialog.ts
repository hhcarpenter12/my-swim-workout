import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";

@Component({
    selector: 'workout-time-tracker-runner-dialog',
    templateUrl: './workout-time-tracker-runner-dialog.html',
})
export class WorkoutTimeTrackerRunnerDialog implements OnInit {

    totalCountdown: number;
    countdown: number;
    countdownDisplay: string;
    retrievedSW: boolean;
    interval: any;
    exSW: any;
    timeoutCount: number;
    currentSet: string;
    nextSet: string;
    percentageComplete: string;
    repNumber: number;
    setListCount = 0;
    yardsComplete: number;
    i = 0;

    constructor(public dialogRef: MatDialogRef<WorkoutTimeTrackerRunnerDialog>,
        @Inject(MAT_DIALOG_DATA) public tableData: any) {



    }


    ngOnInit() {
        this.yardsComplete = 0;
        let totalYards = this.tableData.data.data[this.tableData.id].yardage;
        this.percentageComplete = ((this.yardsComplete / totalYards) * 100) + "%";

        this.goToNextSet(this.tableData.id);

    }

    goToNextRep(id) {
        let set = this.tableData.data.data[id].setList;

        let totSecs = (Number.parseInt(set[this.i].TimeIntervalMinutes) * 60);

        if (set[this.i].TimeIntervalSeconds.charAt(0) == '0') {
            totSecs += Number.parseInt(set[this.i].TimeIntervalSeconds.charAt(1));
        }
        else {
            totSecs += Number.parseInt(set[this.i].TimeIntervalSeconds);
        }

        this.exSW = new Array<boolean>(totSecs);
        this.countdown = totSecs;
        this.retrievedSW = true;

        for (let i = 0; i < totSecs; i++) {
            this.startCountdown(set[this.i], this.tableData.data.data[id].yardage)
            this.timeoutCount += 1000;
        }
    }


    goToNextSet(id) {
        this.timeoutCount = 1000;

        let set = this.tableData.data.data[id].setList;

        let totSecs = (Number.parseInt(set[this.i].TimeIntervalMinutes) * 60);

        if (set[this.i].TimeIntervalSeconds.charAt(0) == '0') {
            totSecs += Number.parseInt(set[this.i].TimeIntervalSeconds.charAt(1));
        }
        else {
            totSecs += Number.parseInt(set[this.i].TimeIntervalSeconds);
        }

        this.repNumber = 1;
        this.currentSet = this.repNumber + " of " + set[this.i].Reps + " x " + set[this.i].Distance + " " + set[this.i].Description + " on " + set[this.i].TimeIntervalMinutes + ":" + set[this.i].TimeIntervalSeconds

        this.setListCount++;

        if (this.setListCount < this.tableData.data.data[0].setList.length) {
            let nSet = this.tableData.data.data[0].setList[this.setListCount]

            this.nextSet = nSet.Reps + " x " + nSet.Distance + " " + nSet.Description + " on " + nSet.TimeIntervalMinutes + ":" + nSet.TimeIntervalSeconds
        }
        else {
            this.nextSet = "Nice job! Workout complete!"
        }

        this.exSW = new Array<boolean>(totSecs);
        this.countdown = totSecs;

        for (let i = 0; i < totSecs; i++) {
            this.startCountdown(set[this.i], this.tableData.data.data[id].yardage)
            this.timeoutCount += 1000;
        }
    }

    startCountdown(set, totalYards) {

        this.exSW[this.countdown] = false;

        setTimeout(() => {

            if (!this.exSW[this.countdown]) {
                this.exSW[this.countdown] = true;
                this.countdown--;
            }

            if (this.countdown <= 0) {
                this.repNumber++;
                this.currentSet = this.repNumber + " of " + set.Reps + " x " + set.Distance + " " + set.Description + " on " + set.TimeIntervalMinutes + ":" + set.TimeIntervalSeconds
                this.yardsComplete += set.Distance;
                this.percentageComplete = Math.trunc(((this.yardsComplete / totalYards) * 100)) + "%";

                this.timeoutCount = 1000;
                this.retrievedSW = false;

                if (this.i < this.tableData.data.data[0].setList.length &&
                    this.repNumber <= set.Reps) {
                    this.goToNextRep(this.tableData.id);
                }
                else if (this.i < this.tableData.data.data[0].setList.length &&
                    this.repNumber > set.Reps) {
                    this.i++;
                    this.goToNextSet(this.tableData.id);
                }
                else {
                    this.currentSet = "Nice job! Workout complete!";
                    this.percentageComplete = "100%"
                }
            }


        }, this.timeoutCount);
    }
}

export interface Workout {
    id: number;
    workoutName: string;
    setList: [];
}