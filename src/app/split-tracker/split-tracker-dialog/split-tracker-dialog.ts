import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'split-tracker-dialog',
  templateUrl: './split-tracker-dialog.html',
})
export class SplitTrackerDialog {

  constructor(public dialogRef: MatDialogRef<SplitTrackerDialog>,
    @Inject(MAT_DIALOG_DATA) public tableData: any) {

  }

  flyMinuteControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  flySecondControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  backMinuteControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  backSecondControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  breastMinuteControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  breastSecondControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  freeMinuteControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  freeSecondControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  minuteControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  secondControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  distanceControl = new FormControl("", [Validators.required]);
  repsControl = new FormControl("", [Validators.required]);

  isIM = false;
  swimmerName = "";
  eventFocus = "50 Freestyle";
  minutesBest = 0;
  secondsBest = 0;
  distance = 25;
  finalTargetTime: string;
  reps = 10;
  restString: string;
  rest = 30;
  holdWithinPR = 0;
  targetMinutesInterval: number;
  targetSecondsInterval: number;
  personalRecord: string;
  flySplitMinutes = 0;
  flySplitSeconds = 0;
  backSplitMinutes = 0;
  backSplitSeconds = 0;
  breastSplitMinutes = 0;
  breastSplitSeconds = 0;
  freeSplitMinutes = 0;
  freeSplitSeconds = 0;
  bestIMTim = "0";
  Free50 = "50 Freestyle";
  Fly50 = "50 Butterfly";
  Back50 = "50 Backstroke";
  Breast50 = "50 Breaststroke";
  IM100 = "100 Individual Medley";
  Fly100 = "100 Butterfly";
  Back100 = "100 Backstroke";
  Breast100 = "100 Breaststroke";
  Free100 = "100 Freestyle";
  IM200 = "200 Individual Medley";
  Fly200 = "200 Butterfly";
  Back200 = "200 Backstroke";
  Breast200 = "200 Breaststroke";
  Free200 = "200 Freestyle";
  Free400 = "400 Freestyle";
  IM400 = "400 Individual Medley";
  Free500 = "500 Freestyle";
  Free800 = "800 Freestyle";
  Free1000 = "1000 Freestyle";
  Free1500 = "1500 Freestyle";
  Free1650 = "1650 Freestyle";
  eventDistanceType = "SCY";
  splitDistanceType = "SCY";

  checkIM() {
    if (this.eventFocus == this.IM100 ||
      this.eventFocus == this.IM200 ||
      this.eventFocus == this.IM400) {
      this.isIM = true;
    }
  }

  generateWorkout() {
    this.restString = "";

    let divisor = this.findDivisor(this.eventFocus, this.distance);

    if (this.isIM) {

      this.finalTargetTime = this.findTargetIMTime(divisor, this.flySplitMinutes, this.flySplitSeconds,
        this.backSplitMinutes, this.backSplitSeconds,
        this.breastSplitMinutes, this.breastSplitSeconds,
        this.freeSplitMinutes, this.freeSplitSeconds,
        this.holdWithinPR, this.eventDistanceType, this.splitDistanceType, this.distance);
    }
    else {
      this.finalTargetTime = this.findTargetTime(divisor, this.holdWithinPR, this.minutesBest, this.secondsBest, this.eventDistanceType, this.splitDistanceType, this.distance);
    }

    let id = 0;

    if (this.tableData.data != undefined &&
      this.tableData.data.data != undefined) {
      id = this.tableData.data.data.length;
    }


    if (this.targetMinutesInterval != null &&
      this.targetSecondsInterval != null) {
      this.restString = this.convertRestTime(this.targetMinutesInterval, this.targetSecondsInterval);
    } else {
      this.restString = this.rest + " seconds";
    }

    if (this.holdWithinPR == undefined) {
      this.holdWithinPR = 0;
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
      eventFocus: this.eventFocus,
      personalRecord: this.personalRecord,
      minutesBest: this.minutesBest,
      secondsBest: this.secondsBest,
      distance: this.distance,
      reps: this.reps,
      restCol: this.restString,
      rest: this.rest,
      targetMinutesInterval: this.targetMinutesInterval,
      targetSecondsInterval: this.targetSecondsInterval,
      holdWithinPR: this.holdWithinPR,
      target: this.finalTargetTime + "",
      flySplitMinutes: this.flySplitMinutes,
      flySplitSeconds: this.flySplitSeconds,
      backSplitMinutes: this.backSplitMinutes,
      backSplitSeconds: this.backSplitSeconds,
      breastSplitMinutes: this.breastSplitMinutes,
      breastSplitSeconds: this.breastSplitSeconds,
      freeSplitMinutes: this.freeSplitMinutes,
      freeSplitSeconds: this.freeSplitSeconds,
      bestIMTim: this.bestIMTim,
      eventDistanceType: this.eventDistanceType,
      splitDistanceType: this.splitDistanceType
    }

    const myData = this.tableData.data.data;

    myData.push(workout);
    this.tableData.data.data = myData;
    this.dialogRef.close();
  }

  convertRestTime(targetMinutesInterval, targetSecondsInterval): string {
    let totalSeconds = (targetMinutesInterval * 60) + targetSecondsInterval;

    var m = Math.floor(totalSeconds % 3600 / 60);
    var s = Math.round(((totalSeconds % 3600 % 60) * 100)) / 100;

    let formattedSeconds = s + "";

    if (s < 10) {
      formattedSeconds = "0" + s;
    }

    return m + ":" + formattedSeconds + " Interval";
  }

  convertOtherTime(minutesBest, secondsBest) {

    let totalSeconds = (minutesBest * 60) + secondsBest;

    var m = Math.floor(totalSeconds % 3600 / 60);
    var s = Math.round(((totalSeconds % 3600 % 60) * 100)) / 100;

    let formattedSeconds = s + "";

    if (s < 10) {
      formattedSeconds = "0" + s;
    }

    this.personalRecord = m + ":" + formattedSeconds;
  }

  findDivisor(eventFocus, tempDistance): number {
    let divisor = 0;

    if (eventFocus == this.Free200 ||
      eventFocus == this.Fly200 ||
      eventFocus == this.Back200 ||
      eventFocus == this.Breast200) {
      divisor = 200 / tempDistance;
    }
    else if (eventFocus == this.Free100 ||
      eventFocus == this.Back100 ||
      eventFocus == this.Breast100 ||
      eventFocus == this.Fly100) {
      divisor = 100 / tempDistance;
    }
    else if (eventFocus == this.Free50 ||
      eventFocus == this.Back50 ||
      eventFocus == this.Breast50 ||
      eventFocus == this.Fly50) {
      divisor = 50 / tempDistance;
    }
    else if (eventFocus == this.Free400) {
      divisor = 400 / tempDistance;
    }
    else if (eventFocus == this.Free500) {
      divisor = 500 / tempDistance;
    }
    else if (eventFocus == this.Free800) {
      divisor = 800 / tempDistance;
    }
    else if (eventFocus == this.Free1000) {
      divisor = 1000 / tempDistance;
    }
    else if (eventFocus == this.Free1500) {
      divisor = 1500 / tempDistance;
    }
    else if (eventFocus == this.Free1650) {
      divisor = 1650 / tempDistance;
    }

    if (eventFocus == this.IM100) {
      if (tempDistance == 25) {
        divisor = 1;
      }
    } else if (eventFocus == this.IM200) {
      if (tempDistance == 25) {
        divisor = 2;
      } else if (tempDistance == 50) {
        divisor = 1;
      }
    } else if (eventFocus == this.IM400) {
      divisor = 100 / tempDistance;
    }

    return divisor;
  }
  findTargetTime(divisor, holdWithinPR, minutesBest, secondsBest, eventDistanceType, splitDistanceType, splitDistance): string {
    let targetTime = "";

    this.convertOtherTime(minutesBest, secondsBest);

    let targetTimeInit = (((minutesBest * 60) + secondsBest) / divisor) + holdWithinPR;

    targetTimeInit = this.convertDistanceTime(eventDistanceType, splitDistanceType, targetTimeInit, splitDistance);

    var m = Math.floor(targetTimeInit % 3600 / 60);
    var s = Math.round(((targetTimeInit % 3600 % 60) * 100)) / 100;

    let formattedSeconds = s + "";

    if (s < 10) {
      formattedSeconds = "0" + s;
    }

    targetTime = m + ":" + formattedSeconds;

    return targetTime;
  }

  convertDistanceTime(eventDistanceType, splitDistanceType, eventBestTime, splitDistance) {
    let numTurns = splitDistance / 50;

    if (eventDistanceType == "SCY") {
      if (splitDistanceType == "SCM") {
        eventBestTime *= 1.11;
      }
      else if (splitDistanceType == "LCM") {
        eventBestTime *= 1.11;
        eventBestTime += numTurns;
      }
    }
    else if (eventDistanceType == "SCM") {
      if (splitDistanceType == "SCY") {
        eventBestTime = eventBestTime - (eventBestTime * 0.11);
      }
      else if (splitDistanceType == "LCM") {
        eventBestTime += numTurns;
      }
    }
    else if (eventDistanceType == "LCM") {
      if (splitDistanceType == "SCY") {
        eventBestTime = eventBestTime - (eventBestTime * 0.11) - numTurns;
      }
      else if (splitDistanceType == "SCM") {
        eventBestTime = eventBestTime - (eventBestTime * 0.11);
      }

    }

    return Math.round(eventBestTime * 100) / 100;
  }

  findTargetIMTime(divisor, flySplitMinutes, flySplitSeconds, backSplitMinutes, backSplitSeconds,
    breastSplitMinutes, breastSplitSeconds, freeSplitMinutes,
    freeSplitSeconds, holdWithinPR, eventDistanceType, splitDistanceType, splitDistance): string {
    let targetTime = "";

    let targetFly = (((flySplitMinutes * 60) + flySplitSeconds) / divisor) + holdWithinPR;
    let targetBack = (((backSplitMinutes * 60) + backSplitSeconds) / divisor) + holdWithinPR;
    let targetBreast = (((breastSplitMinutes * 60) + breastSplitSeconds) / divisor) + holdWithinPR;
    let targetFree = (((freeSplitMinutes * 60) + freeSplitSeconds) / divisor) + holdWithinPR;

    targetFly = this.convertDistanceTime(eventDistanceType, splitDistanceType, targetFly, splitDistance);
    targetBack = this.convertDistanceTime(eventDistanceType, splitDistanceType, targetBack, splitDistance);
    targetBreast = this.convertDistanceTime(eventDistanceType, splitDistanceType, targetBreast, splitDistance);
    targetFree = this.convertDistanceTime(eventDistanceType, splitDistanceType, targetFree, splitDistance);


    targetTime = targetFly + " Fly / " + targetBack + " Back / " +
      targetBreast + " Breast / " + targetFree + " Free";



    this.personalRecord = this.bestIMTim;

    return targetTime;
  }


  save() {
    this.dialogRef.close({ data: this.tableData });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  convertIMTime(flySplitMinutes, flySplitSeconds, backSplitMinutes,
    backSplitSeconds, breastSplitMinutes, breastSplitSeconds,
    freeSplitMinutes, freeSplitSeconds) {

    let totalSeconds = (flySplitMinutes * 60) + flySplitSeconds +
      (backSplitMinutes * 60) + backSplitSeconds +
      (breastSplitMinutes * 60) + breastSplitSeconds +
      (freeSplitMinutes * 60) + freeSplitSeconds;

    let m = Math.floor(totalSeconds % 3600 / 60);
    let s = Math.round(((totalSeconds % 3600 % 60) * 100)) / 100;

    let formattedSeconds = s + "";

    if (s < 10) {
      formattedSeconds = "0" + s;
    }

    this.bestIMTim = m + ":" + formattedSeconds;
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
  holdWithinPR: number;
  targetMinutesInterval: number;
  targetSecondsInterval: number;
  target: string;
  flySplitMinutes: number;
  flySplitSeconds: number;
  backSplitMinutes: number;
  backSplitSeconds: number;
  breastSplitMinutes: number;
  breastSplitSeconds: number;
  freeSplitMinutes: number;
  freeSplitSeconds: number;
  bestIMTim: string;
  eventDistanceType: string;
  splitDistanceType: string;
}