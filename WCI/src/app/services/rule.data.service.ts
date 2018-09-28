import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { ServicesConstants } from './constants.service'

const urlAlertRules = ServicesConstants.APM_SERVER_ADDRESS + '/apm/alertrule';
const urlSampleTestRules = ServicesConstants.APM_SERVER_ADDRESS + '/apm/testrule';
const urlGlobalRuleSettings = ServicesConstants.APM_SERVER_ADDRESS + '/apm/setting';
const urlEquipments = ServicesConstants.APM_SERVER_ADDRESS + '/apm/equipment';
const urlSampleTests = ServicesConstants.APM_SERVER_ADDRESS + '/apm//test';
const urlZones = ServicesConstants.APM_SERVER_ADDRESS + '/apm//zone';
const urlPatientLocation = ServicesConstants.APM_SERVER_ADDRESS + '/apm//location';
const urlEquipmentModels = ServicesConstants.APM_SERVER_ADDRESS + '/apm/equipmentmodel';
const urlSession = ServicesConstants.APM_SERVER_ADDRESS + '/apm/session/Administrator';
const urlDeleteAlertRules = ServicesConstants.APM_SERVER_ADDRESS + '/apm/alertrule';
const urlAutoFilterEvent = ServicesConstants.APM_SERVER_ADDRESS + '/apm/event';
const urlAutoFilterAlert = ServicesConstants.APM_SERVER_ADDRESS + '/apm/alert/status';
const urlAutoFilterAlertResolve = ServicesConstants.APM_SERVER_ADDRESS + '/apm/alert/resolve';

@Injectable()
export class RuleDataService extends DataService {
    equipmentData: any;
    constructor(http: HttpClient) {
        super(http);
    }

    public getAlertRulesData(): any {
        var promise = new Promise((resolve) => {
            var url = urlAlertRules;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getSampleTestRulesData(): any {
        var promise = new Promise((resolve) => {
            var url = urlSampleTestRules;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getGlobalRuleSettingsData(scope: string): any {
        var promise = new Promise((resolve) => {
            var url = urlGlobalRuleSettings + "s" + "?scope=" + scope;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public setAlertRulesData(updateRules: any): any {
        let body = updateRules;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlAlertRules;
            this.sendJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public setSampleTestRulesData(updateRules: any): any {
        let body = updateRules;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlSampleTestRules;
            this.sendJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public setGlobalRuleSettingsData(setting: any): any {
        let body = setting;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlGlobalRuleSettings;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public deleteAlertRulesData(ruleId: number): any {

        var promise = new Promise((resolve) => {
            var url = urlDeleteAlertRules + "?id=" + ruleId;
            this.deleteWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public deleteSampleTestRulesData(ruleId: number): any {

        var promise = new Promise((resolve) => {
            var url = urlSampleTestRules + "?id=" + ruleId;
            this.deleteWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getEquipmentsData(): any {
        var promise = new Promise((resolve) => {
            var url = urlEquipments;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getSampleTests(): any {
        var promise = new Promise((resolve) => {
            var url = urlSampleTests;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getZones(): any {
        var promise = new Promise((resolve) => {
            var url = urlZones;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getPatientLocations(): any {
        var promise = new Promise((resolve) => {
            var url = urlPatientLocation;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getEquipmentModelsData(): any {
        var promise = new Promise((resolve) => {
            var url = urlEquipmentModels;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getInstrumentNamebyId(instrumentId: number) {
        var promise = new Promise((resolve) => {
            if (this.equipmentData != undefined) {
                this.equipmentData.forEach(element => {
                    if (element.Id == instrumentId) {
                        resolve(element.Name);
                    }
                });
            } else {
                this.getEquipmentsData().then((data) => {
                    this.equipmentData = data;
                    data.forEach(element => {
                        if (element.Id == instrumentId) {
                            resolve(element.Name);
                        }
                    });
                });
            }
        });
        return promise;
    }

    public getAutoFilterEventData(): any {
        var promise = new Promise((resolve) => {
            var url = urlAutoFilterEvent;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public setEventData(updateEvents: any): any {
        let body = updateEvents;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlAutoFilterEvent;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public resolveAlerts(alertId: number): any {
        let body = { "id": alertId, "alertStatus": 2 };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlAutoFilterAlert;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getResolveAlerts(alertId: number): any {
        var promise = new Promise((resolve) => {
            var url = urlAutoFilterAlertResolve + "?id=" + alertId;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

}