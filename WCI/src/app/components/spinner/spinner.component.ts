import {Component, Input, OnDestroy} from '@angular/core';

@Component({
    selector: 'wait-screen',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {
    isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.isDelayedRunning = false;
            return;
        } else {
            this.isDelayedRunning = true;
            return;
        }
    }


    ngOnDestroy(): any {
        this.isDelayedRunning = false;
    }
}