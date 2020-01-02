import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";
import { ConvertTimeUtilityComponent } from 'src/app/convertTimeUtility.component';

@Component({
    selector: 'workout-time-tracker-runner-dialog',
    templateUrl: './workout-time-tracker-runner-dialog.html',
})
export class WorkoutTimeTrackerRunnerDialog implements OnInit {

    totalCountdown: number;
    countdown: number;
    countdownString: string;
    countdownDisplay: string;
    retrievedSW: boolean;
    interval: any;
    exSW: any;
    timeoutCount: number;
    currentSet: string;
    nextSet: string;
    completedSecsWorkout: number;
    totalSecsWorkout: number;
    percentageComplete: string;
    workoutPausedSW: boolean;
    repNumber: number;
    setListCount = 0;
    yardsComplete: number;
    i = 0;
    timeElapsed: number;
    timeElapsedString: string;

    constructor(public dialogRef: MatDialogRef<WorkoutTimeTrackerRunnerDialog>,
        @Inject(MAT_DIALOG_DATA) public tableData: any,
        private convertTimeUtility: ConvertTimeUtilityComponent) {



    }


    ngOnInit() {
        this.completedSecsWorkout = 0;
        this.totalSecsWorkout = 0;

        for (let set of this.tableData.data.data[this.tableData.id].setList) {

            this.totalSecsWorkout += (this.convertTimeUtility.determineSecondFormatting(set.TimeIntervalMinutes, set.TimeIntervalSeconds) * set.Reps);
            console.log(this.totalSecsWorkout)
        }

        console.log(this.totalSecsWorkout)

        this.percentageComplete = ((this.completedSecsWorkout / this.totalSecsWorkout) * 100) + "%";

        this.goToNextSet(this.tableData.id);

    }

    goToNextRep(id) {
        let set = this.tableData.data.data[id].setList;

        let totSecs = this.convertTimeUtility.determineSecondFormatting(set.TimeIntervalMinutes, set.TimeIntervalSeconds);

        this.exSW = new Array<boolean>(totSecs);
        this.countdown = totSecs;
        this.timeElapsed = 0;
        this.retrievedSW = true;

        for (let i = 0; i < totSecs; i++) {
            this.startCountdown(set[this.i])
            this.timeoutCount += 1000;
        }
    }


    goToNextSet(id) {
        this.timeoutCount = 1000;

        let set = this.tableData.data.data[id].setList;

        let totSecs = this.convertTimeUtility.determineSecondFormatting(set[this.i].TimeIntervalMinutes, set[this.i].TimeIntervalSeconds);

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
        this.timeElapsed = 0;

        for (let i = 0; i < totSecs; i++) {
            this.startCountdown(set[this.i])
            this.timeoutCount += 1000;
        }
    }

    pauseWorkout() {
        this.workoutPausedSW = !this.workoutPausedSW;
    }

    endWorkout() {
        if(confirm("Are you sure to end workout?")) {
            this.dialogRef.close();   
        }
    }

    startCountdown(set) {

        this.exSW[this.countdown] = false;


        setTimeout(() => {

            if (!this.exSW[this.countdown] &&
                !this.workoutPausedSW) {
                this.exSW[this.countdown] = true;
                this.countdownString = this.convertTimeUtility.convertTimeSec(this.countdown);
                this.countdown--;
                this.timeElapsed++;
                this.timeElapsedString = this.convertTimeUtility.convertTimeSec(this.timeElapsed);
                this.completedSecsWorkout++;
                this.percentageComplete = Math.trunc(((this.completedSecsWorkout / this.totalSecsWorkout) * 100)) + "%";
            }

            if (this.countdown <= 0) {
                this.repNumber++;
                this.currentSet = this.repNumber + " of " + set.Reps + " x " + set.Distance + " " + set.Description + " on " + set.TimeIntervalMinutes + ":" + set.TimeIntervalSeconds
                this.yardsComplete += set.Distance;


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