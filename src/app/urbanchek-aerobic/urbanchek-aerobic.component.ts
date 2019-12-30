import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UrbanchekAerobicDialog } from './urbanchek-aerobic/urbanchek-aerobic-dialog';

@Component({
  selector: 'urbanchek-aerobic',
  styleUrls: ['urbanchek-aerobic.component.scss'],
  templateUrl: 'urbanchek-aerobic.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AerobicTrainingComponent implements OnInit {


  constructor(public dialog: MatDialog) {
  }

  columnsToDisplay = ['swimmerName', 'reps', 'distance', 'effort', 'delete'];
  expandedElement: Workout | null;

  dataSource = new MatTableDataSource<Workout>(ELEMENT_DATA);
  title = 'Swim Workout Generator';

  ourFile: File; // hold our file
  imagePath = 'swimmingBackground.jpg'
  minuteControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  secondControl = new FormControl("", [Validators.max(60), Validators.min(0), Validators.required]);
  distanceControl = new FormControl("", [Validators.required]);
  repsControl = new FormControl("", [Validators.required]);
  swimmerName = "";
  distance = 25;
  finalTargetTime: string;
  reps = 0;
  restString: string;
  rest = 0;
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
  whiteString: string;
  pinkString: string;
  redString: string;
  blueString: string;
  purpleString: string;
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
  importWorkout: any;
  bestIMTim = "0";
  eventDistanceType = "SCY";
  splitDistanceType = "SCY";
  white: number;
  pink: number;
  red: number;
  blue: number;
  purple: number;
  effort: string;

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

  findDivisor(timeTrialDistance, tempDistance): number {
    let divisor = 0;

    if (timeTrialDistance == 200) {
      divisor = 200 / tempDistance;
    }
    else if (timeTrialDistance == 300) {
      divisor = 300 / tempDistance;
    }
    else if (timeTrialDistance == 400) {
      divisor = 400 / tempDistance;
    }
    else if (timeTrialDistance == 500) {
      divisor = 500 / tempDistance;
    }
    else if (timeTrialDistance == 2000) {
      divisor = 2000 / tempDistance;
    }

    return divisor;
  }

  determineEffortLevel(timeTrialDistance, minutes, seconds, distance, white, pink, red, blue, purple, effort) {
    let totalSeconds = (minutes * 60) + seconds;

    let baseTime = 0;

    if (timeTrialDistance == 200) {
      baseTime = (totalSeconds / 2) / 0.8349;
    }
    else if (timeTrialDistance == 300) {
      baseTime = (totalSeconds / 3) / 0.8812;
    }
    else if (timeTrialDistance == 400) {
      baseTime = (totalSeconds / 4) / 0.8984;
    }
    else if (timeTrialDistance == 500) {
      baseTime = (totalSeconds / 5) / 0.9036;
    }
    else if (timeTrialDistance == 2000) {
      baseTime = (totalSeconds / 20);
    }

    white = 0;
    pink = 0;
    red = 0;
    blue = 0;
    purple = 0;

    baseTime *= (Number.parseInt(timeTrialDistance) / distance);

    if (distance == Number.parseInt("50")) {
      white = baseTime * this.WHITE50;
      pink = baseTime * this.PINK50;
      red = baseTime * this.RED50;
      blue = baseTime * this.BLUE50;
      purple = baseTime * this.PURPLE50;
    }
    else if (distance == Number.parseInt("100")) {
      white = baseTime * this.WHITE100;
      pink = baseTime * this.PINK100;
      red = baseTime * this.RED100;
      blue = baseTime * this.BLUE100;
      purple = baseTime * this.PURPLE100;
    }
    else if (distance == Number.parseInt("150")) {
      white = baseTime / this.WHITE150;
      pink = baseTime / this.PINK150;
      red = baseTime / this.RED150;
      blue = baseTime / this.BLUE150;
      purple = baseTime / this.PURPLE150;
    }
    else if (distance == Number.parseInt("200")) {
      white = baseTime / this.WHITE200;
      pink = baseTime / this.PINK200;
      red = baseTime / this.RED200;
      blue = baseTime / this.BLUE200;
      purple = baseTime / this.PURPLE200;
    }
    else if (distance == Number.parseInt("300")) {
      white = baseTime / this.WHITE300;
      pink = baseTime / this.PINK300;
      red = baseTime / this.RED300;
      blue = baseTime / this.BLUE300;
      purple = baseTime / this.PURPLE300;
    }
    else if (distance == Number.parseInt("400")) {
      white = baseTime / this.WHITE400;
      pink = baseTime / this.PINK400;
      red = baseTime / this.RED400;
      blue = baseTime / this.BLUE400;
      purple = baseTime / this.PURPLE400;
    }
    else if (distance == Number.parseInt("500")) {
      white = baseTime / this.WHITE500;
      pink = baseTime / this.PINK500;
      red = baseTime / this.RED500;
      blue = baseTime / this.BLUE500;
      purple = baseTime / this.PURPLE500;
    }

    this.whiteString = this.convertTime(white);
    this.pinkString = this.convertTime(pink)
    this.redString = this.convertTime(red);
    this.blueString = this.convertTime(blue);
    this.purpleString = this.convertTime(purple);
  }

  convertTime(inputSeconds) {
    var m = Math.floor(inputSeconds % 3600 / 60);
    var s = Math.round(((inputSeconds % 3600 % 60) * 100)) / 100;

    let formattedSeconds = s + "";

    if (s < 10) {
      formattedSeconds = "0" + s;
    }

    return m + ":" + formattedSeconds;
  }

  findTargetTime(divisor, minutesBest, secondsBest, splitDistance, timeTrialDistance, white, pink, red, blue, purple, effort): string {
    let targetTime = "";

    this.convertOtherTime(minutesBest, secondsBest);

    let targetTimeInit = (((minutesBest * 60) + secondsBest) / divisor);

    var m = Math.floor(targetTimeInit % 3600 / 60);
    var s = Math.round(((targetTimeInit % 3600 % 60) * 100)) / 100;

    this.determineEffortLevel(timeTrialDistance, m, s, splitDistance, white, pink, red, blue, purple, effort)

    let formattedSeconds = s + "";

    if (s < 10) {
      formattedSeconds = "0" + s;
    }

    targetTime = m + ":" + formattedSeconds;

    return targetTime;
  }

  editWorkout(element) {

    let divisor = this.findDivisor(element.timeTrialDistance, element.distance);

    this.finalTargetTime = this.findTargetTime(divisor, element.minutesBest,
      element.secondsBest, element.distance, element.timeTrialDistance,
      element.white, element.pink, element.red, element.blue, element.purple, element.effort);

    element.personalRecord = this.personalRecord;

    if (element.targetMinutesInterval != null &&
      element.targetSecondsInterval != null &&
      !Number.isNaN(element.targetMinutesInterval) &&
      !Number.isNaN(element.targetSecondsInterval)) {
      this.restString = this.convertRestTime(element.targetMinutesInterval, element.targetSecondsInterval);
    } else {
      this.restString = element.rest + " seconds";
    }

    if (element.rest == undefined ||
      (element.targetMinutesInterval == undefined ||
        element.targetSecondsInterval == undefined)) {
      element.rest = 0;
      element.targetMinutesInterval = 0;
      element.targetSecondsInterval = 0;
    }

    let id = element.id;

    element.targetTime = this.finalTargetTime;

    let workout = {
      id: id,
      swimmerName: element.swimmerName,
      timeTrialDistance: element.timeTrialDistance,
      personalRecord: element.personalRecord,
      minutesBest: element.minutesBest,
      secondsBest: element.secondsBest,
      distance: element.distance,
      reps: element.reps,
      rest: element.rest,
      targetMinutesInterval: element.targetMinutesInterval,
      targetSecondsInterval: element.targetSecondsInterval,
      target: element.finalTargetTime + "",
      white: this.whiteString,
      pink: this.pinkString,
      red: this.redString,
      blue: this.blueString,
      purple: this.purpleString,
      effort: element.effort
    }

    const data = this.dataSource.data;
    data[id] = workout;
    this.dataSource.data = data;
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
    a.download = "urbanchekAerobic.csv";
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
    const dialogRef = this.dialog.open(UrbanchekAerobicDialog, {
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
            timeTrialDistance: JSON.parse(line[2]),
            personalRecord: JSON.parse(line[3]),
            minutesBest: Number.parseInt(line[4]),
            secondsBest: Math.round(Number.parseFloat(line[5]) * 100) / 100,
            distance: JSON.parse(line[6]),
            reps: Number.parseInt(line[7]),
            rest: Number.parseInt(line[8]),
            targetMinutesInterval: Number.parseInt(line[9]),
            targetSecondsInterval: Number.parseInt(line[10]),
            target: JSON.parse(line[11]),
            white: JSON.parse(line[12]),
            pink: JSON.parse(line[13]),
            red: JSON.parse(line[14]),
            blue: JSON.parse(line[15]),
            purple: JSON.parse(line[16]),
            effort: JSON.parse(line[17])
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
  timeTrialDistance: string;
  personalRecord: string;
  minutesBest: number;
  secondsBest: number;
  distance: number;
  reps: number;
  rest: number;
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

const ELEMENT_DATA: Workout[] = [];


