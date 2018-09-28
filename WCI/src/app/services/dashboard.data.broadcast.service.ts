import {BehaviorSubject} from 'rxjs/BehaviorSubject'; 
import { Injectable } from '@angular/core'   
import { Zone } from '../models/zone';

@Injectable()
export class DashboardBroadcastService {
    selectedZone: Zone;
    public ZoneSubject: BehaviorSubject<Zone> = new BehaviorSubject<Zone>(this.selectedZone);
    /**
     * Gets the the name of the selected zone
     */
    public getZone() {
        return new Promise(resolve => {
            resolve(this.selectedZone);
        });
    }

    /**
     * updates the name of the selected zone on dropdwown selection change
     * @param zone 
     */
    public updateZone(zone: Zone) {
        return new Promise(resolve => {
            this.selectedZone = zone;
            this.ZoneSubject.next(this.selectedZone);
            resolve(name);
        });
    }
}