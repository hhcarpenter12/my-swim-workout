import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';
import { ConvertTimeUtilityComponent } from 'src/app/convertTimeUtility.component';
import { DivisorUtilityComponent } from 'src/app/divisorUtility.component';


@Component({
  selector: 'urbanchek-aerobic-dialog',
  templateUrl: './urbanchek-aerobic-dialog.html',
})
export class UrbanchekAerobicDialog {

  constructor(public dialogRef: MatDialogRef<UrbanchekAerobicDialog>,
    @Inject(MAT_DIALOG_DATA) public tableData: any,
    private convertTimeUtility: ConvertTimeUtilityComponent,
    private findDivisorUtility: DivisorUtilityComponent) {

  }

  minuteControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  secondControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  repsControl = new FormControl("", [Validators.required]);

  timeTrialDistance = "0";
  isIM = false;
  swimmerName = "";
  minutesBest = 0;
  secondsBest = 0;
  distance = "0";
  finalTargetTime: string;
  reps = 10;
  restString: string;
  rest = 30;
  targetMinutesInterval = 0;
  targetSecondsInterval = 0;
  personalRecord: string;
  WHITE50 = 0.467272727;
  PINK50 = 0.450649351;
  RED50 = 0.443333333;
  BLUE50 = 0.428571429;
  PURPLE50 = 0.413333;
  WHITE100 = 1.007792208;
  PINK100 = 0.975324675;
  RED100 = 0.958333333;
  BLUE100 = 0.925974026;
  PURPLE100 = 0.893333333;
  WHITE150 = 0.655877342;
  PINK150 = 0.668983493
  RED150 = 0.690087829;
  BLUE150 = 0.703839122;
  PURPLE150 = 0.729927007;
  WHITE200 = 0.48951049;
  PINK200 = 0.495814552;
  RED200 = 0.514981273;
  BLUE200 = 0.522033898;
  PURPLE200 = 0.541190619;
  WHITE300 = 0.324347094;
  PINK300 = 0.328498294;
  RED300 = 0.341402855;
  BLUE300 = 0.34591195;
  PURPLE300 = 0.358565737;
  WHITE400 = 0.242424242
  PINK400 = 0.244897959
  RED400 = 0.255102041
  BLUE400 = 0.257731959
  PURPLE400 = 0.267300267
  WHITE500 = 0.193485972
  PINK500 = 0.193861066
  RED500 = 0.203665988
  BLUE500 = 0.20555
  PURPLE500 = 0.21161533
  whiteString: string;
  pinkString: string;
  redString: string;
  blueString: string;
  purpleString: string;
  white: number;
  pink: number;
  red: number;
  blue: number;
  purple: number;
  effort: string;

  convertRestTime(targetMinutesInterval, targetSecondsInterval): string {
    let totalSeconds = (targetMinutesInterval * 60) + targetSecondsInterval;

    return this.convertTimeUtility.convertTimeSec(totalSeconds);
  }

  generateWorkout() {
    this.restString = "";

    let divisor = this.findDivisorUtility.findDivisor(this.timeTrialDistance, this.distance);

    this.finalTargetTime = this.findTargetTime(divisor, this.minutesBest, this.secondsBest);

    let id = 0;

    if (this.tableData.data != undefined &&
      this.tableData.data.data != undefined) {
      id = this.tableData.data.data.length;
    }

    if (this.targetMinutesInterval != null &&
      this.targetSecondsInterval != null &&
      !Number.isNaN(this.targetMinutesInterval) &&
      !Number.isNaN(this.targetSecondsInterval)) {
      this.restString = this.convertRestTime(this.targetMinutesInterval, this.targetSecondsInterval);
    } else {
      this.restString = this.rest + " seconds";
    }

    if (this.rest == undefined &&
      (this.targetMinutesInterval == undefined ||
        this.targetSecondsInterval == undefined)) {
      this.rest = 0;
      this.targetMinutesInterval = undefined;
      this.targetSecondsInterval = undefined;
    }

    let workout = {
      id: id,
      swimmerName: this.swimmerName,
      timeTrialDistance: this.timeTrialDistance,
      personalRecord: this.personalRecord,
      minutesBest: this.minutesBest,
      secondsBest: this.secondsBest,
      distance: this.distance,
      reps: this.reps,
      restCol: this.restString,
      rest: this.rest,
      targetMinutesInterval: this.targetMinutesInterval,
      targetSecondsInterval: this.targetSecondsInterval,
      target: this.finalTargetTime + "",
      white: this.whiteString,
      pink: this.pinkString,
      red: this.redString,
      blue: this.blueString,
      purple: this.purpleString,
      effort: this.effort
    }

    const myData = this.tableData.data.data;

    myData.push(workout);
    this.tableData.data.data = myData;
    this.dialogRef.close();
  }

  determineEffortLevel(minutes, seconds) {
    let totalSeconds = (minutes * 60) + seconds;

    let baseTime = 0;

    if (this.timeTrialDistance == "200") {
      baseTime = (totalSeconds / 2) / 0.8349;
    }
    else if (this.timeTrialDistance == "300") {
      baseTime = (totalSeconds / 3) / 0.8812;
    }
    else if (this.timeTrialDistance == "400") {
      baseTime = (totalSeconds / 4) / 0.8984;
    }
    else if (this.timeTrialDistance == "500") {
      baseTime = (totalSeconds / 5) / 0.9036;
    }
    else if (this.timeTrialDistance == "2000") {
      baseTime = (totalSeconds / 20);
    }

    this.white = 0;
    this.pink = 0;
    this.red = 0;
    this.blue = 0;
    this.purple = 0;

    baseTime *= (Number.parseInt(this.timeTrialDistance) / Number.parseInt(this.distance));

    if (this.distance == "50") {
      this.white = baseTime * this.WHITE50;
      this.pink = baseTime * this.PINK50;
      this.red = baseTime * this.RED50;
      this.blue = baseTime * this.BLUE50;
      this.purple = baseTime * this.PURPLE50;
    }
    else if (this.distance == "100") {
      this.white = baseTime * this.WHITE100;
      this.pink = baseTime * this.PINK100;
      this.red = baseTime * this.RED100;
      this.blue = baseTime * this.BLUE100;
      this.purple = baseTime * this.PURPLE100;
    }
    else if (this.distance == "150") {
      this.white = baseTime / this.WHITE150;
      this.pink = baseTime / this.PINK150;
      this.red = baseTime / this.RED150;
      this.blue = baseTime / this.BLUE150;
      this.purple = baseTime / this.PURPLE150;
    }
    else if (this.distance == "200") {
      this.white = baseTime / this.WHITE200;
      this.pink = baseTime / this.PINK200;
      this.red = baseTime / this.RED200;
      this.blue = baseTime / this.BLUE200;
      this.purple = baseTime / this.PURPLE200;
    }
    else if (this.distance == "300") {
      this.white = baseTime / this.WHITE300;
      this.pink = baseTime / this.PINK300;
      this.red = baseTime / this.RED300;
      this.blue = baseTime / this.BLUE300;
      this.purple = baseTime / this.PURPLE300;
    }
    else if (this.distance == "400") {
      this.white = baseTime / this.WHITE400;
      this.pink = baseTime / this.PINK400;
      this.red = baseTime / this.RED400;
      this.blue = baseTime / this.BLUE400;
      this.purple = baseTime / this.PURPLE400;
    }
    else if (this.distance == "500") {
      this.white = baseTime / this.WHITE500;
      this.pink = baseTime / this.PINK500;
      this.red = baseTime / this.RED500;
      this.blue = baseTime / this.BLUE500;
      this.purple = baseTime / this.PURPLE500;
    }

    this.whiteString = this.convertTimeUtility.convertTimeSec(this.white);
    this.pinkString = this.convertTimeUtility.convertTimeSec(this.pink);
    this.redString = this.convertTimeUtility.convertTimeSec(this.red);
    this.blueString = this.convertTimeUtility.convertTimeSec(this.blue);
    this.purpleString = this.convertTimeUtility.convertTimeSec(this.purple);
  }

  findTargetTime(divisor, minutesBest, secondsBest): string {

    let targetTimeInit = (((minutesBest * 60) + secondsBest) / divisor);

    this.personalRecord = this.convertTimeUtility.convertTimeSec(targetTimeInit);

    let m = Math.floor(targetTimeInit % 3600 / 60);
    let s = Math.round(((targetTimeInit % 3600 % 60) * 100)) / 100;

    this.determineEffortLevel(m, s)

    return this.convertTimeUtility.convertTimeMinSec(m, s);
  }

 

  save() {
    this.dialogRef.close({ data: this.tableData });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface Workout {
  id: number;
  swimmerName: string;
  eventFocus: string;
  personalRecord: string;
  minutesBest: number;
  secondsBest: number;
  distance: number;
  reps: number;
  rest: number;
  restCol: string;
  targetMinutesInterval: number;
  targetSecondsInterval: number;
  target: string;
  white: string;
  pink: string;
  red: string;
  blue: string;
  purple: string;
  effort: string;
}