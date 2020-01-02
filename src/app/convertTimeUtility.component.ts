import { Component } from '@angular/core';



@Component({
    selector: 'app-root',
    styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})
export class ConvertTimeUtilityComponent {

    constructor() {
    }

    convertTimeSec(seconds) {
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

        if (h == 0 &&
            m == 0) {
            return formattedSeconds;
        }
        else if (h == 0 &&
            m != 0) {
            return formattedMinutes + ":" + formattedSeconds;
        }

        return h + ":" + formattedMinutes + ":" + formattedSeconds;
    }

    convertTimeMinSec(min, sec) {
        let formattedSeconds = sec + "";

        if (sec < 10) {
            formattedSeconds = "0" + sec;
        }

        return min + ":" + formattedSeconds;
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

    determineSecondFormatting(min, sec) {        
        let totSecs = (Number.parseInt(min) * 60);

        if (sec != null &&
            sec.charAt(0) == '0' &&
            sec.length > 0) {
            totSecs += Number.parseInt(sec.charAt(1));
        }
        else {
            totSecs += Number.parseInt(sec);
        }

        return totSecs;
    }
}
