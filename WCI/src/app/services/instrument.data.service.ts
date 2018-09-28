import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { ServicesConstants } from './constants.service';
import { InstrumentItem } from '../models/instrument-item';
import { EquipmentModel } from '../models/equipment-model';

const urlEquipments = ServicesConstants.APM_SERVER_ADDRESS + '/apm/equipment';
const urlEquipmentModels = ServicesConstants.APM_SERVER_ADDRESS + '/apm/equipmentmodel';

@Injectable()
export class InstrumentDataService extends DataService {
    equipmentData: Array<InstrumentItem>;
    equipmentModelData: Array<EquipmentModel>;
    http: HttpClient;

    constructor(http: HttpClient) {
        super(http);
    }

    public getEquipmentsData(): any {
        var promise = new Promise((resolve) => {
            var url = urlEquipments;
            if (this.equipmentData != undefined) {
                resolve(this.equipmentData);
            } else {
                this.loadJsonWithPromise(url).then((data) => {
                    //this.equipmentData = data;
                    resolve(data);
                });
            }
        })
        return promise;
    }

    public addEquipments(equipment: any): any {
        let body = equipment;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlEquipments;
            this.sendJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public updateEquipments(equipment: any): any {
        let body = equipment;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlEquipments;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public deleteEquipment(equipmentId: number): any {

        var promise = new Promise((resolve) => {
            var url = urlEquipments + "?equipmentId=" + equipmentId;
            this.deleteWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }



    public getEquipmentModelsData(): any {
        var promise = new Promise((resolve) => {
            var url = urlEquipmentModels;
            if (this.equipmentModelData != undefined) {
                resolve(this.equipmentModelData);
            } else {
                this.loadJsonWithPromise(url).then((data) => {
                    //this.equipmentModelData = data;
                    resolve(data);
                });
            }
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

    public getInstrumentsData(): any {
        let equipments, equipmentModels;
        let instruments = [];
        var promise = new Promise((resolve) => {
            this.getEquipmentsData().then((data) => {
                equipments = data;
                this.getEquipmentModelsData().then((data1) => {
                    equipmentModels = data1;
                    equipments.forEach(equipment => {
                        equipmentModels.forEach(equipmentmodel => {
                            if (equipment.EquipmentModelId == equipmentmodel.Id && (equipmentmodel.Type == 1 || equipmentmodel.Type == 4)) {
                                instruments.push(equipment);
                            }
                        });
                    });
                    resolve(instruments);
                });
            });
        });
        return promise;
    }


    public getInstrumentsAllData(): any {
        let equipments, equipmentModels;
        let instruments = [];
        var promise = new Promise((resolve) => {
            this.getEquipmentsData().then((data) => {
                equipments = data;
                this.getEquipmentModelsData().then((data1) => {
                    equipmentModels = data1;
                    equipments.forEach(equipment => {
                        equipmentModels.forEach(equipmentmodel => {
                            if (equipment.EquipmentModelId == equipmentmodel.Id) {
                                instruments.push(equipment);
                            }
                        });
                    });
                    resolve(instruments);
                });
            });
        });
        return promise;
    }

}