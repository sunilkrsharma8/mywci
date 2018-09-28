import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { ServicesConstants } from './constants.service'

const urlNoteTemplate = ServicesConstants.APM_SERVER_ADDRESS +'/apm/notetemplate';
const myurl = 'https://www.google.com/s2/favicons?domain_url=facebook.com';

@Injectable()
export class CannedCommentsDataService extends DataService {
    http: HttpClient;
    constructor(http: HttpClient) {
        super(http);
    }

    public getNoteTemplates(): any {
        var promise = new Promise((resolve) => {
            var url = urlNoteTemplate;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }
    public addNoteTemplate(noteTemplate: any): any {
        let body = noteTemplate;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlNoteTemplate;
            this.sendJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }
    public updateNoteTemplate(noteTemplate: any): any {
        let body = noteTemplate;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        let requestOption: RequestOptionsArgs = { search: params, headers: headers };

        var promise = new Promise((resolve) => {
            var url = urlNoteTemplate;
            this.editJsonWithPromise(url, body, requestOption).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }
    public deleteNoteTemplate(noteTemplateId: number): any {

        var promise = new Promise((resolve) => {
            var url = urlNoteTemplate + "?notetemplateId=" + noteTemplateId;
            this.deleteWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }

    

}