import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { ServicesConstants } from './constants.service';

const urlUnresolvedAlerts = ServicesConstants.APM_SERVER_ADDRESS + '/apm/alert/unresolved';
const urladdNotes = ServicesConstants.APM_SERVER_ADDRESS + '/apm/alert/note';
const urlNoteTemplate = ServicesConstants.APM_SERVER_ADDRESS + '/apm/notetemplate';
const urlRecentlyResolvedAlerts = ServicesConstants.APM_SERVER_ADDRESS + '/apm/alert/recentlyresolved';

@Injectable()
export class AlertDataService extends DataService {
    equipmentData: any;
    constructor(http: HttpClient){
        super(http);
    }

    public getUnresolvedAlerts():any{
        var promise = new Promise((resolve) =>{
            var url = urlUnresolvedAlerts;
            this.loadJsonWithPromise(url).then((data)=>{
                resolve(data);
            });
        })
        return promise;
    }

    public getRecentlyResolvedAlerts():any{
        var promise = new Promise((resolve) =>{
            var url = urlRecentlyResolvedAlerts;
            this.loadJsonWithPromise(url).then((data)=>{
                resolve(data);
            });
        })
        return promise;
    }

    public addNote(id: number, noteText: string){
        let body = {"id": id, "noteText" : noteText};
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urladdNotes;
            this.sendJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    public getNoteTemplate(): any{
        var promise = new Promise((resolve) =>{
            var url = urlNoteTemplate;
            this.loadJsonWithPromise(url).then((data)=>{
                resolve(data);
            });
        })
        return promise;
    }
}