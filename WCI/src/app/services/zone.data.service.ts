import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { ServicesConstants } from './constants.service'
import { Zone } from '../models/zone';

const urlZones = ServicesConstants.APM_SERVER_ADDRESS + '/apm/zone';

@Injectable()
export class ZoneDataService extends DataService {
    equipmentData: any;
    zones: Array<Zone>
    http: HttpClient;

    constructor(http: HttpClient) {
        super(http);
    }

    public getZones(): any {
        var promise = new Promise((resolve) => {
            var url = urlZones;
            if (this.zones != undefined) {
                resolve(this.zones);
            } else {
                this.loadJsonWithPromise(url).then((data) => {
                    //this.zones = data;
                    resolve(data);
                });
            }
        })
        return promise;
    }
}