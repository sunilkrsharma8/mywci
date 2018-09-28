import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { ServicesConstants } from './constants.service';

const urlCustomTile = ServicesConstants.APM_SERVER_ADDRESS + '/apm/customtiles';
const urlCustomTileUpdate = ServicesConstants.APM_SERVER_ADDRESS + '/apm/customtile';

@Injectable()
export class CustomTileDataService extends DataService {
    equipmentData: any;
    http: HttpClient;

    constructor(http: HttpClient) {
        super(http);
    }

    public getCustomTilesData(): any {
        var promise = new Promise((resolve) => {
            var url = urlCustomTile;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public addCustomTile(customTile: any): any {
        let body = customTile;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlCustomTileUpdate;
            this.sendJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public updateCustomTile(customTile: any): any {
        let body = customTile;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlCustomTileUpdate;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public deleteCustomTile(customTileId: number): any {

        var promise = new Promise((resolve) => {
            var url = urlCustomTileUpdate + "?id=" + customTileId;
            this.deleteWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }
}