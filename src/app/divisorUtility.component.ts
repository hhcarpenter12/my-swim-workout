import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})
export class DivisorUtilityComponent {

    IM100 = "100 Individual Medley";
    IM200 = "200 Individual Medley"
    IM400 = "400 Individual Medley"

    constructor() {
    }

    findEventDistance(eventFocus) {
        let eventDistance = eventFocus.replace(/[\W_]+/g, "");
        return Number.parseInt(eventDistance.replace(/[^0-9]/gi, ''));
    }

    findDivisor(timeTrialDistance, tempDistance): number {

        return timeTrialDistance / tempDistance;
    }

    findDivisorIM(eventFocus, tempDistance) {

        let divisor = 0;

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
        } else {
            let distance = this.findEventDistance(eventFocus)
            divisor = this.findDivisor(distance, tempDistance);
        }

        return divisor;
    }
}