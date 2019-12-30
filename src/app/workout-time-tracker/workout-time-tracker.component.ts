import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutTimeTrackerDialog } from './workout-time-tracker-dialog/workout-time-tracker-dialog';
import { WorkoutTimeTrackerRunnerDialog } from './workout-time-tracker-runner-dialog/workout-time-tracker-runner-dialog';



@Component({
    selector: 'workout-time-tracker',
    styleUrls: ['workout-time-tracker.component.scss'],
    templateUrl: 'workout-time-tracker.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class WorkoutTimeTrackerComponent implements OnInit {

    Reps = 0;
    Distance = 0;
    Description = '';
    TimeIntervalMinutes = 0;
    TimeIntervalSeconds = 0;
    yardage: number;
    completionTimeSeconds: number;
    completionTime: string;
    fixedSeconds: string;
    columnsToDisplay = ['workoutName', 'yardage', 'completionTime', 'delete'];
    expandedElement: Workout | null;
    dataSource = new MatTableDataSource<Workout>(ELEMENT_DATA);
    ourFile: any;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(WorkoutTimeTrackerDialog, {
            width: '500px',
            data: { data: this.dataSource }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.dataSource = result.data;
            }
        });
    }

    fixSeconds(passedSeconds) {
        let fixedSeconds = "";

        if (passedSeconds <= 9 &&
            passedSeconds >= 0) {
            fixedSeconds = "0" + passedSeconds;
        }
        else {
            fixedSeconds = passedSeconds + "";
        }

        return fixedSeconds;
    }

    deleteSet(index, setList, element) {
        this.getTotalSeconds(element);

        for (let i = 0; i < setList.length; i++) {
            if (i == index) {
                let todoObj = setList[i];

                for (let i = 0; i < todoObj.Reps; i++) {

                    element.yardage -= todoObj.Distance;

                    let totSecs = (Number.parseInt(todoObj.TimeIntervalMinutes) * 60);

                    if (todoObj.TimeIntervalSeconds.charAt(0) == '0') {
                        totSecs += Number.parseInt(todoObj.TimeIntervalSeconds.charAt(1));
                    }
                    else {
                        totSecs += Number.parseInt(todoObj.TimeIntervalSeconds);
                    }

                    this.completionTimeSeconds -= totSecs;
                    element.completionTime = this.convertTimeToMinutesSeconds(this.completionTimeSeconds);
                }
            }
        }

        setList.splice(index, 1);

        this.editWorkout(element);
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

        if (m < 10) {
            formattedMinutes = "0" + m;
        }

        return h + ":" + formattedMinutes + ":" + formattedSeconds;
    }

    addSet(event, setList, yardage, completionTime, element) {
        let todoObj = {
            Reps: this.Reps,
            Distance: this.Distance,
            Description: this.Description,
            TimeIntervalMinutes: this.TimeIntervalMinutes,
            TimeIntervalSeconds: this.fixSeconds(this.TimeIntervalSeconds)
        }

        setList.push(todoObj);

        this.getTotalSeconds(element);

        this.getYardageDuration(todoObj, yardage, completionTime, element);

        this.editWorkout(element);

        event.preventDefault();
    }

    beginWorkout() {
        const dialogRef = this.dialog.open(WorkoutTimeTrackerRunnerDialog, {
            width: '500px',
            data: { data: this.dataSource }
        });
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
        a.download = "workoutTimeTracker.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
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
    
              let json = "";  


              console.log(line.length);

              for (let j = 4; j < line.length; j++)
              {
                json += line[j];
              }  

              
              json = json.replace(/"Distance"/g, ",'Distance'");
              json= json.replace(/"Description"/g, ",'Description'");
              json = json.replace(/"TimeIntervalMinutes"/g, ",'TimeIntervalMinutes'")
              json = json.replace(/"TimeIntervalSeconds"/g, ",'TimeIntervalSeconds'")
              json = json.replace(/{"Reps"/g, ", {'Reps'")
              json = json.replace(/'/g, '"');
              json = json.replace("[", "[{")
              json = json.replace("]", "}]")
              json = json.replace("[{, ", "[{")

              let count = 0;

              while (json.indexOf("set") != -1)
              {
                json = this.replaceAt(json, "set", count + "", json.indexOf("set"), json.indexOf("set") + 3)
                count++;
              }

              let jArr = json.split(" ");

              
              let objArr = [];

              for (let j of jArr)
              {
                j = j.replace("[", "");
                j = j.replace("]", "");
                j = j.replace('},', "}");
                j = j.replace('{{', '{');
                j = j.replace('}}', '}')
                let set = JSON.parse(j);

                objArr.push(set);
              }

              let workout = {
                id: Number.parseInt(line[0]),
                workoutName: JSON.parse(line[1]),
                completionTime: JSON.parse(line[2]),
                yardage: JSON.parse(line[3]),
                setList: objArr
              }
              
              const data = this.dataSource.data;
              data.push(workout);
              this.dataSource.data = data;
            }
          }
        }
      }
      
    replaceAt(input, search, replace, start, end) {
        return input.slice(0, start)
            + input.slice(start, end).replace(search, replace)
            + input.slice(end);
    }


    editWorkout(element) {
        let id = element.id;

        let workout = {
            id: id,
            workoutName: element.workoutName,
            yardage: element.yardage,
            completionTime: element.completionTime,
            setList: element.setList
        }

        const data = this.dataSource.data;
        data[id] = workout;
        this.dataSource.data = data;
    }

    getTotalSeconds(element) {
        this.completionTimeSeconds = 0;

        for (let set of element.setList) {
            for (let i = 0; i < set.Reps; i++) {
                let totSecs = (Number.parseInt(set.TimeIntervalMinutes) * 60);

                if (set.TimeIntervalSeconds.charAt(0) == '0') {
                    totSecs += Number.parseInt(set.TimeIntervalSeconds.charAt(1));
                }
                else {
                    totSecs += Number.parseInt(set.TimeIntervalSeconds);
                }

                this.completionTimeSeconds += totSecs;
            }
        }
    }


    getYardageDuration(todoObj, yardage, completionTime, element) {



        for (let i = 0; i < todoObj.Reps; i++) {

            yardage += todoObj.Distance;

            let totSecs = (Number.parseInt(todoObj.TimeIntervalMinutes) * 60);

            if (todoObj.TimeIntervalSeconds.charAt(0) == '0') {
                totSecs += Number.parseInt(todoObj.TimeIntervalSeconds.charAt(1));
            }
            else {
                totSecs += Number.parseInt(todoObj.TimeIntervalSeconds);
            }

            this.completionTimeSeconds += totSecs;

            completionTime = this.convertTimeToMinutesSeconds(this.completionTimeSeconds);
        }

        element.yardage = yardage;
        element.completionTime = completionTime;
    }
}

export interface Workout {
    id: number;
    workoutName: string;
    setList: any [];
}

const ELEMENT_DATA: Workout[] = [];