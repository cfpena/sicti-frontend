
//import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import {Http , Headers,  RequestOptions } from '@angular/http';
import { NavController, Toast } from 'ionic-angular';
import { Url } from '../url';
//import {Load} from './loading';
//import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
//import {LocalStorageService} from "angular-2-local-storage"
import { Storage } from '@ionic/storage';
//import { localforage } from 'localforage';
export class HttpRequest {

    url = new Url();
    local: Storage = new Storage();
    constructor(public http: Http) {}
    presentToast(text: any, nav: NavController) {
        let toast = Toast.caller({


            message: text.json()['detail'],
            duration: 3000
        });
        nav.push(toast);
    }
    getToken(nav: NavController) {
        return this.local.get('auth').then(res => {
            return JSON.parse(res).token;
        }, error => {
            this.presentToast(error, nav)
        });
    }
    getHeaders(nav: NavController) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept", "application/json");
        return this.getToken(nav).then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return headers
        }).catch(error => this.presentToast(error, nav))

    }

    get(url: string, nav: NavController) {
        return this.getHeaders(nav).then(headers => {
            var requestOptions= new RequestOptions();
            requestOptions.headers = headers as Headers;

            return this.http.get(url.toString(), requestOptions).toPromise().catch(error => {this.presentToast(error, nav) });
        }).then(result=>{return result}).catch(error => { this.presentToast(JSON.stringify(error), nav) })
    }
    post(url: string, params: string, nav: NavController) {

        return this.getHeaders(nav).then(headers => {
          var requestOptions= new RequestOptions();
          requestOptions.headers = headers as Headers;

            return this.http.post(url, params,requestOptions).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{return result}).catch(error => { this.presentToast(error, nav) })

    }
    patch(url: string, params: string, nav: NavController) {

        return this.getHeaders(nav).then(headers => {
          var requestOptions= new RequestOptions();
          requestOptions.headers = headers as Headers;

            return this.http.patch(url, params, requestOptions).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{}).catch(error => { this.presentToast(error, nav) })

    }
    delete(url: string, nav: NavController) {

        return this.getHeaders(nav).then(headers => {
          var requestOptions= new RequestOptions();
          requestOptions.headers = headers as Headers;
            return this.http.delete(url, requestOptions).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{}).catch(error => { this.presentToast(error, nav) })

    }


}
