import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    setCount = 0;
    timeElapsed: number;
    timeElapsedString: string;

    

    constructor(public dialogRef: MatDialogRef<WorkoutTimeTrackerRunnerDialog>,
        @Inject(MAT_DIALOG_DATA) public tableData: any,
        private convertTimeUtility: ConvertTimeUtilityComponent) {

    }

    @ViewChild('audioOption', {static: false}) audioPlayerRef: ElementRef;
    @ViewChild('audioOption2', {static: false}) audioPlayerRef2: ElementRef;

    ngOnInit() {
        this.completedSecsWorkout = 0;
        this.totalSecsWorkout = 0;

        for (let set of this.tableData.data.data[this.tableData.id].setList) {

            this.totalSecsWorkout += (this.convertTimeUtility.determineSecondFormatting(set.TimeIntervalMinutes, set.TimeIntervalSeconds) * set.Reps);
        }

        this.percentageComplete = ((this.completedSecsWorkout / this.totalSecsWorkout) * 100) + "%";

        this.goToNextSet(this.tableData.id, this.tableData.data.data[this.tableData.id].setList.length);
    }

    goToNextRep(id) {
        
        let setLength = this.tableData.data.data[id].setList.length;
        
        let set = this.tableData.data.data[id].setList[this.setCount - 1];    

        if (set != undefined &&
            set.TimeIntervalMinutes != undefined &&
            set.TimeIntervalSeconds != undefined) {

            let totSecs = this.convertTimeUtility.determineSecondFormatting(set.TimeIntervalMinutes, set.TimeIntervalSeconds);

            this.exSW = new Array<boolean>(totSecs);
            this.countdown = totSecs;
            this.timeElapsed = 0;
            this.retrievedSW = true;

            for (let i = 0; i < totSecs; i++) {
                this.startCountdown(set, setLength)
                this.timeoutCount += 1000;
            }
        }
    }

    goToNextSet(id, setListLength) {
        this.timeoutCount = 1000;

            let set = this.tableData.data.data[id].setList;
            let setLength = this.tableData.data.data[id].setList.length;
            
            let totSecs = this.convertTimeUtility.determineSecondFormatting(set[this.setCount].TimeIntervalMinutes, set[this.setCount].TimeIntervalSeconds);

            this.repNumber = 1;
            this.currentSet = this.repNumber + " of " + set[this.setCount].Reps + " x " + set[this.setCount].Distance + " " + set[this.setCount].Description + " on " + set[this.setCount].TimeIntervalMinutes + ":" + set[this.setCount].TimeIntervalSeconds

            this.setListCount++;

            if (this.setListCount < this.tableData.data.data[0].setList.length) {
                let nSet = this.tableData.data.data[id].setList[this.setListCount]

                this.nextSet = nSet.Reps + " x " + nSet.Distance + " " + nSet.Description + " on " + nSet.TimeIntervalMinutes + ":" + nSet.TimeIntervalSeconds
            }
            else {
                this.nextSet = "Nice job! Workout complete!"
            }

            this.exSW = new Array<boolean>(totSecs);
            this.countdown = totSecs;
            this.timeElapsed = 0;

            for (let i = 0; i < totSecs; i++) {
                this.startCountdown(set[this.setCount], setLength)
                this.timeoutCount += 1000;
            }

            this.setCount++;
    }

    pauseWorkout() {
        this.workoutPausedSW = !this.workoutPausedSW;
    }

    endWorkout() {
        if (confirm("Are you sure to end workout?")) {
            this.dialogRef.close();
        }
    }

    playNextRepAudio() {
        this.audioPlayerRef.nativeElement.play();
    }

    startCountdown(set, setLength) {

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

                console.log(this.repNumber)

                if (this.setCount <= setLength &&
                    this.repNumber <= set.Reps)  {

                    this.playNextRepAudio();
                    this.goToNextRep(this.tableData.id);
                }
                else if (this.setCount < setLength &&
                    this.repNumber > set.Reps) {

                        this.playNextRepAudio();
                        this.goToNextSet(this.tableData.id, setLength);
                }
                else if (this.setCount >= setLength) {
                    this.currentSet = "Nice job! Workout complete!";
                    this.percentageComplete = "100%"
                    this.playFinishedAuto();
                }
            }


        }, this.timeoutCount);
    }

    playFinishedAuto() {
        this.audioPlayerRef2.nativeElement.play();
    }
}




export interface Workout {
    id: number;
    workoutName: string;
    setList: [];
}