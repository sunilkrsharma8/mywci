import { Injectable} from '@angular/core';

@Injectable()
export class HelperFunctions {
    public static transformtoSeconds(strThreshold: string): number {
        let regex = /P((([0-9]*\.?[0-9]*)Y)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)W)?(([0-9]*\.?[0-9]*)D)?)?(T(([0-9]*\.?[0-9]*)H)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)S)?)?/

        let matches = strThreshold.match(regex);
        let days: number = 0, minutes: number = 0, hours: number = 0, seconds: number = 0, k: number = 0;

        days = Number(matches[9] == undefined ? 0: matches[9]);
        hours = Number(matches[12] == undefined ? 0: matches[12]);
        minutes = Number(matches[14] == undefined ? 0: matches[14]);
        seconds = Number(matches[16] == undefined ? 0: matches[16]);
        return (days*24*60*60) + (minutes*60) + (hours*60*60) + seconds ;
    }

    public static trasformSeondstoISO8601(seconds: number): string{
        let days: number, hours: number, minutes: number;
        let iso8601Duration: string = "PT";

        return "PT" + seconds +"S";
    }

    public static transformTimestamptoDate(timestamp: any): Date {
        let strAlertTime = timestamp;
        let alertimeinMilliSec;
        if (strAlertTime.indexOf("-") != -1) {
            alertimeinMilliSec = strAlertTime.substr(strAlertTime.indexOf("(") + 1, strAlertTime.indexOf("-") - strAlertTime.indexOf("(") - 1);
            var offset = strAlertTime.substr(strAlertTime.indexOf("-") + 1, strAlertTime.indexOf(")") - strAlertTime.indexOf("-") - 1);
            alertimeinMilliSec = alertimeinMilliSec - parseInt(offset.substr(0, 2)) * 60 * 60 * 1000 + parseInt(offset.substr(2, 2)) * 60 * 1000;
        } else if (strAlertTime.indexOf("+") != -1) {
            alertimeinMilliSec = strAlertTime.substr(strAlertTime.indexOf("(") + 1, strAlertTime.indexOf("+") - strAlertTime.indexOf("(") - 1);
            var offset = strAlertTime.substr(strAlertTime.indexOf("+") + 1, strAlertTime.indexOf(")") - strAlertTime.indexOf("+") - 1);
            alertimeinMilliSec = alertimeinMilliSec - parseInt(offset.substr(0, 2)) * 60 * 60 * 1000 + parseInt(offset.substr(2, 2)) * 60 * 1000;
        }
        return new Date(parseInt(alertimeinMilliSec));
    }

    public static transformIntegertoRGBA(color: number): string{
        color >>>= 0;
        var b = color & 0xFF,
            g = (color & 0xFF00) >>> 8,
            r = (color & 0xFF0000) >>> 16,
            a = ( (color & 0xFF000000) >>> 24 ) / 255 ;
        return "rgb(" + [r, g, b].join(",") + ")";
    }

}