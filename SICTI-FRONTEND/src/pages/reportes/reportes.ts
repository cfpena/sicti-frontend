
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
//import { Kit } from '../kit/kit.model';
//import { MaterializeDirective } from "../../materialize-directive";
//import { DatePicker } from 'ionic-native';

import { Reporte } from './reportes.model'
import { ReporteService } from '../../providers/reportes.service'
import { IngresoEgreso } from './ingresoegreso.model';
import { ITEM } from '../item/item.model';
import { Prestamo } from '../prestamo/prestamo.model'
//import { ToastController } from 'ionic-angular';
//import {Http, Response} from 'angular2/http';


import {MaterializeDirective} from "angular2-materialize";
import { NgModule }      from '@angular/core';


@NgModule({
  declarations : [MaterializeDirective],
})


/*
  Generated class for the ReportesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'reportes.html',
   // directives: [MaterializeDirective],
    providers: [ReporteService],
})
export class ReportesPage {
    title: string = 'Reportes';
    tiposBusquedas = ['Movimientos', 'Préstamos', 'Existencias'];
    busqueda = '';
    reporte = new Reporte();
    IngresosEgresos: IngresoEgreso[];
    Prestamos: Prestamo[];
    today = new Date().toLocaleDateString();
    Existencias: Array<ITEM> = []


    constructor(private navController: NavController,
        private menu: MenuController,
        private service: ReporteService
    ) {
        this.busqueda = this.tiposBusquedas[0]
        //console.log(this.today)
    }
    openMenu() {
        this.menu.open();
    }


    pdf() {

        if (this.reporte.Fecha_Inicial != '' && this.reporte.Fecha_Final != '') {
            //console.log(this.reporte.Fecha_Final)
            if (this.busqueda == 'Movimientos') {
                this.service.getReporteInventariopdf(this.reporte, this.navController).then(result => {
                    var reader = new FileReader();
                    var blob = new Blob([result['_body']], { type: 'application/pdf' });
                    reader.readAsDataURL(blob)

                    reader.onloadend = function(e) {
                        window.open(reader.result, "pdf");
                    }
                })
            }
             else if (this.busqueda == 'Préstamos') {
              this.service.getReportePrestamopdf(this.reporte, this.navController).then(result => {
                  var reader = new FileReader();
                  var blob = new Blob([result['_body']], { type: 'application/pdf' });
                  reader.readAsDataURL(blob)

                  reader.onloadend = function(e) {
                      window.open(reader.result, "pdf");
                  }
              })
        }
      }
      if (this.busqueda == 'Existencias') {
        this.service.getReporteExistenciapdf(this.reporte, this.navController).then(result => {
            var reader = new FileReader();
            var blob = new Blob([result['_body']], { type: 'application/pdf' });
            reader.readAsDataURL(blob)

            reader.onloadend = function(e) {
                window.open(reader.result, "pdf");
            }
        })

      }
    }

    crear() {

        if (this.reporte.Fecha_Inicial != '' && this.reporte.Fecha_Final != '') {
            //console.log(this.reporte.Fecha_Final)
            if (this.busqueda == 'Movimientos') {
                this.service.getReporteInventario(this.reporte, this.navController).then(result => {
                    this.IngresosEgresos =  JSON.parse(JSON.stringify(result))  as IngresoEgreso[]
                    for (let ingresoEgreso of this.IngresosEgresos) {
                        this.service.httprequest.get(String(ingresoEgreso.Item), this.navController).then(result => {
                            ingresoEgreso.Item =  JSON.parse(JSON.stringify(result))  as ITEM

                        })
                    }

                }).then(() => {
                    //console.log(this.IngresosEgresos)
                })
            } else if (this.busqueda == 'Préstamos') {
                this.service.getReportePrestamo(this.reporte, this.navController).then(result => {
                    this.Prestamos =  JSON.parse(JSON.stringify(result))  as Prestamo[]
                    for (let prestamo of this.Prestamos) {
                        this.service.httprequest.get(String(prestamo.Item), this.navController).then(result => {
                            prestamo.Item =  JSON.parse(JSON.stringify(result))  as ITEM
                        })
                        this.service.httprequest.get(String(prestamo.Acta), this.navController).then(result => {
                            prestamo.Acta =  JSON.parse(JSON.stringify(result)) ['Codigo']
                        })
                    }

                }).then(() => {
                    console.log(this.Prestamos)
                })

            }


        }

         if (this.busqueda == 'Existencias') {

            this.service.getReporteExistencia(this.reporte, this.navController).then(Existencias => { this.Existencias = Existencias; return Existencias }).then(Existencias => {




            }).then(() => {
                console.log(this.Existencias)
            })


        }
    }
}
