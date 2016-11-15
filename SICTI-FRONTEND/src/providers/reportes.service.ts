import { Injectable }     from '@angular/core';
import { Http, Headers } from '@angular/http';
import {NavController} from 'ionic-angular';
import {Url} from './../url';
import {HttpRequest} from '../app/httprequest';
import {Reporte} from '../pages/reportes/reportes.model';
import {ITEM} from '../pages/item/item.model';
import {Response} from 'angular2/http';
@Injectable()
export class ReporteService {
    url = new Url();
    httprequest:HttpRequest;

    constructor(private http: Http) {
          this.httprequest = new HttpRequest(http);
        }

    getReporteInventario(reporte: Reporte,nav: NavController){
      return this.httprequest.post(this.url.base + this.url.reporteInventario,JSON.stringify(reporte),nav)

    }

    getReporteInventariopdf(reporte: Reporte,nav: NavController){
      return this.httprequest.post(this.url.base + this.url.reporteInventariopdf,JSON.stringify(reporte),nav)

    }

    getReportePrestamo(reporte: Reporte,nav: NavController){
      return this.httprequest.post(this.url.base + this.url.reportePrestamo,JSON.stringify(reporte),nav)

    }
    getReportePrestamopdf(reporte: Reporte,nav: NavController){
      return this.httprequest.post(this.url.base + this.url.reportePrestamopdf,JSON.stringify(reporte),nav)

    }

    getReporteExistencia(reporte: Reporte,nav: NavController){
      return this.httprequest.get(this.url.base + this.url.reporteExistencia,nav).then(result => {
          let existencias =  JSON.parse(JSON.stringify(result)) as ITEM[];
          return existencias;
        })
}
getReporteExistenciapdf(reporte: Reporte,nav: NavController){
  return this.httprequest.get(this.url.base + this.url.reporteExistenciapdf,nav)
}
}
