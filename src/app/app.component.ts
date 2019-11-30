import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppDialog } from './app-dialog/app-dialog';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  columnsToDisplay = ['swimmerName', 'eventFocus', 'eventDistanceType', 'personalRecord', 'distance', 'splitDistanceType',
    'reps', 'restCol', 'holdWithinPR', 'target', 'delete'];
  expandedElement: Workout | null;

  dataSource = new MatTableDataSource<Workout>(ELEMENT_DATA);
  title = 'Swim Workout Generator';

  ourFile: File; // hold our file
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
  swimmerName = "";
  eventFocus = "50 Freestyle";
  minutesBest: number;
  secondsBest: number;
  distance: number;
  finalTargetTime: string;
  reps: number;
  restString: string;
  rest: number;
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
  Breast50 = "50 Breastroke";
  IM100 = "100 Individual Medley";
  Fly100 = "100 Butterfly";
  Back100 = "100 Backstroke";
  Breast100 = "100 Breastroke";
  Free100 = "100 Freestyle";
  IM200 = "200 Individual Medley";
  Fly200 = "200 Butterfly";
  Back200 = "200 Backstroke";
  Breast200 = "200 Breastroke";
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
  imagePath = "assets/img/swimmingBackground.jpg";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.deleteRow(ELEMENT_DATA[0]);
  }

  convertIMTimeElement(element) {
    let totalSeconds = (element.flySplitMinutes * 60) + element.flySplitSeconds +
      (element.backSplitMinutes * 60) + element.backSplitSeconds +
      (element.breastSplitMinutes * 60) + element.breastSplitSeconds +
      (element.freeSplitMinutes * 60) + element.freeSplitSeconds;

    let m = Math.floor(totalSeconds % 3600 / 60);
    let s = Math.round(((totalSeconds % 3600 % 60) * 100)) / 100;

    let formattedSeconds = s + "";

    if (s < 10) {
      formattedSeconds = "0" + s;
    }

    element.bestIMTim = m + ":" + formattedSeconds;
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

    this.convertIMTime(flySplitMinutes, flySplitSeconds, backSplitMinutes, backSplitSeconds, breastSplitMinutes, breastSplitSeconds, freeSplitMinutes, freeSplitSeconds);
    
    this.personalRecord = this.bestIMTim;

    return targetTime;
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

  editWorkout(element) {

    let divisor = this.findDivisor(element.eventFocus, element.distance);

    if (element.eventFocus == this.IM100 ||
      element.eventFocus == this.IM200 ||
      element.eventFocus == this.IM400) {
      this.finalTargetTime = this.findTargetIMTime(divisor, element.flySplitMinutes, element.flySplitSeconds,
        element.backSplitMinutes, element.backSplitSeconds,
        element.breastSplitMinutes, element.breastSplitSeconds,
        element.freeSplitMinutes, element.freeSplitSeconds,
        element.holdWithinPR, element.eventDistanceType, element.splitDistanceType, element.distance);

      element.personalRecord = this.personalRecord;
    }
    else {
      this.finalTargetTime = this.findTargetTime(divisor, element.holdWithinPR, element.minutesBest,
        element.secondsBest, element.eventDistanceType, element.splitDistanceType, element.distance);

      element.personalRecord = this.personalRecord;
    }

    if (element.targetMinutesInterval != null &&
      element.targetSecondsInterval != null &&
      !Number.isNaN(element.targetMinutesInterval) &&
      !Number.isNaN(element.targetSecondsInterval)) {
      this.restString = this.convertRestTime(element.targetMinutesInterval, element.targetSecondsInterval);
    } else {
      this.restString = element.rest + " seconds";
    }


    let id = element.id;

    element.targetTime = this.finalTargetTime;
    element.restCol = this.restString;


    let workout = {
      id: id,
      swimmerName: element.swimmerName,
      eventFocus: element.eventFocus,
      personalRecord: element.personalRecord,
      minutesBest: element.minutesBest,
      secondsBest: element.secondsBest,
      distance: element.distance,
      reps: element.reps,
      restCol: element.restCol,
      rest: Number.parseInt(element.rest),
      targetMinutesInterval: element.targetMinutesInterval,
      targetSecondsInterval: element.targetSecondsInterval,
      holdWithinPR: element.holdWithinPR,
      target: element.targetTime,
      flySplitMinutes: element.flySplitMinutes,
      flySplitSeconds: element.flySplitSeconds,
      backSplitMinutes: element.backSplitMinutes,
      backSplitSeconds: element.backSplitSeconds,
      breastSplitMinutes: element.breastSplitMinutes,
      breastSplitSeconds: element.breastSplitSeconds,
      freeSplitMinutes: element.freeSplitMinutes,
      freeSplitSeconds: element.freeSplitSeconds,
      bestIMTim: this.bestIMTim,
      eventDistanceType: element.eventDistanceType,
      splitDistanceType: element.splitDistanceType
    }

    const data = this.dataSource.data;
    data[id] = workout;
    this.dataSource.data = data;
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

  downloadFile() {
    let data = this.dataSource.data;
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/csv' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "swimWorkout.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  deleteRow(row_obj) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {

      return value.id != row_obj.id;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppDialog, {
      width: '500px',
      data: { data: this.dataSource }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.dataSource = result.data;
      }
    });
  }

  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      this.ourFile = file;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: string = reader.result as string;

        let csvRead = csv.split("\n");

        for (let i = 1; i < csvRead.length; i++) {
          let line = csvRead[i].split(',');


          let workout = {
            id: Number.parseInt(line[0]),
            swimmerName: JSON.parse(line[1]),
            eventFocus: JSON.parse(line[2]),
            personalRecord: JSON.parse(line[3]),
            minutesBest: Number.parseInt(line[4]),
            secondsBest: Math.round(Number.parseFloat(line[5]) * 100) / 100,
            distance: Number.parseInt(line[6]),
            reps: Number.parseInt(line[7]),
            restCol: JSON.parse(line[8]),
            rest: Number.parseInt(line[9]),
            targetMinutesInterval: Number.parseInt(line[10]),
            targetSecondsInterval: Number.parseInt(line[11]),
            holdWithinPR: JSON.parse(line[12]),
            target: JSON.parse(line[13]),
            flySplitMinutes: Number.parseInt(line[14]),
            flySplitSeconds: Number.parseInt(line[15]),
            backSplitMinutes: Number.parseInt(line[16]),
            backSplitSeconds: Number.parseInt(line[17]),
            breastSplitMinutes: Number.parseInt(line[18]),
            breastSplitSeconds: Number.parseInt(line[19]),
            freeSplitMinutes: Number.parseInt(line[20]),
            freeSplitSeconds: Number.parseInt(line[21]),
            bestIMTim: JSON.parse(line[22]),
            eventDistanceType: JSON.parse(line[23]),
            splitDistanceType: JSON.parse(line[24])
          }

          const data = this.dataSource.data;
          data.push(workout);
          this.dataSource.data = data;
        }
      }
    }
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

const ELEMENT_DATA: Workout[] = [];
