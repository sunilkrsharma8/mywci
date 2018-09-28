import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { ServicesConstants } from './constants.service'

const urlExtSystem = ServicesConstants.APM_SERVER_ADDRESS + '/apm/extsystem';
const urlGlobalSettings = ServicesConstants.APM_SERVER_ADDRESS + '/apm/setting';
const urlIntegrationEquipmentMaps = ServicesConstants.APM_SERVER_ADDRESS + '/apm/equipmentintegrationmaps';

@Injectable()
export class IntgrationDataService extends DataService {
    equipmentData: any;
    constructor(http: HttpClient) {
        super(http);
    }

    public getExtSystems(): any {
        var promise = new Promise((resolve) => {
            var url = urlExtSystem;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public addExtSystems(extSys: any): any {
        let body = extSys;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlExtSystem;
            this.sendJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public updateExtSystems(extSys: any): any {
        let body = extSys;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlExtSystem;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public deleteExtSystem(extSysId: number): any {

        var promise = new Promise((resolve) => {
            var url = urlExtSystem + "?externalSystemId=" + extSysId;
            this.deleteWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getGlobalSettingsData(scope: string): any {
        var promise = new Promise((resolve) => {
            var url = urlGlobalSettings + "s" + "?scope=" + scope;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public setGlobalDataRouterSettingsData(setting: any): any {
        let body = setting;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlGlobalSettings;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getIntegrationEquipmentMapsData(): any {
        var promise = new Promise((resolve) => {
            var url = urlIntegrationEquipmentMaps;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public updateIntegrationEquipmentMapsData(maps: any): any {
        let body = maps;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlIntegrationEquipmentMaps;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }
}