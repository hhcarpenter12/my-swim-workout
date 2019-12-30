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
    reducedSW: boolean;


    constructor(public dialogRef: MatDialogRef<WorkoutTimeTrackerRunnerDialog>,
        @Inject(MAT_DIALOG_DATA) public tableData: any) {



    }

    
    ngOnInit() {
        for (let set of this.tableData.data.data[0].setList) {

            console.log(set)

            if (!this.retrievedSW) {
                
                let totSecs = (Number.parseInt(set.TimeIntervalMinutes) * 60);

                    if (set.TimeIntervalSeconds.charAt(0) == '0') {
                        totSecs += Number.parseInt(set.TimeIntervalSeconds.charAt(1));
                    }
                    else {
                        totSecs += Number.parseInt(set.TimeIntervalSeconds);
                    }

                    
                this.countdown = totSecs;
                this.retrievedSW = true;
   
                for (let i = 0; i < totSecs; i++)
                {
                    this.startCountdown(this.reducedSW)
                    this.reducedSW = false; 
                }

                this.reducedSW = false;

            }


                if (this.countdown === 0)
                {

                    this.retrievedSW = false;
                }

        }
    
    }



    startCountdown(reducedSW){
       
        let r = reducedSW;

        let interval = setTimeout(() => {
          
            console.log(r)
            if (! r)
            {
           r = true;     
          this.countdown--;
            }

        }, 1000);
        
         
    
    };

      

}

export interface Workout {
    id: number;
    workoutName: string;
    setList: [];
}