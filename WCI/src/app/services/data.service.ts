import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicesConstants } from './constants.service'

const urlSession = ServicesConstants.APM_SERVER_ADDRESS +'/apm/session/Administrator';

@Injectable()
export class DataService {
    equipmentData: any;
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
        this.getSAession().then((data) => {
        });
    }
	/**
	 * For synchronized call using promise.
	*/
    public loadJsonWithPromise(url: string): any {
        var promise = new Promise((resolve, reject) => {
            this.http.get(url).subscribe((response) => {
                resolve(response);
            },
                (err) => {
                    resolve({});
                }
            );
        });

        return promise;
    }

    public sendJsonWithPromise(url: string, body: any, requestOption: any): any {
        var promise = new Promise((resolve, reject) => {
            this.http.post(url, body, requestOption).subscribe((response) => {
                resolve(response);
            },
                (err) => {
                    resolve({});
                }
            );
        });

        return promise;
    }

    public editJsonWithPromise(url: string, body: any, requestOption: any): any {
        var promise = new Promise((resolve, reject) => {
            this.http.put(url, body, requestOption).subscribe((response) => {
                resolve(response);
            },
                (err) => {
                    resolve({});
                }
            );
        });

        return promise;
    }

    public deleteWithPromise(url: string): any {
        var promise = new Promise((resolve, reject) => {
            this.http.delete(url).subscribe((response) => {
                resolve();
            },
                (err) => {
                    resolve({});
                }
            );
        });

        return promise;
    }

    public getSAession(): any {
        var promise = new Promise((resolve) => {
            var url = urlSession;
            this.loadJsonWithPromise(url).then((data) => {
                resolve(data);
            });
        })
        return promise;
    }
}

