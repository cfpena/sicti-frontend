import { Component, OnInit, Input } from '@angular/core';
import { NavController, MenuController,Platform } from 'ionic-angular';
import { ITEM } from './item.model';

import { Validator } from "validator.ts/Validator";
//import { Url } from './url'
import { Http } from '@angular/http';
import {ItemService } from '../../providers/item.service';
import {Camera} from 'ionic-native';
import { ToastController } from 'ionic-angular';

import {MaterializeDirective} from "angular2-materialize";
import { NgModule }      from '@angular/core';


@NgModule({
  declarations : [MaterializeDirective],
})

/*
  Generated class for the ItemPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
    templateUrl: 'item.html',
  //  directives: [MaterializeDirective],
    providers: [ItemService],
})

export class ItemPage implements OnInit {
    title: string = 'Ítems';
    items:  Array<ITEM> =[]
    template: string = 'null';
    itemsTemporal: ITEM[] = [];
    itemsEliminar: ITEM[] = [];
    @Input()
    itemNuevo = new ITEM();
    @Input()
    itemModificar = new ITEM;
    selected: number[] = [];
    tiposBusquedas = ['código', 'Nombre'];
    busqueda = { tipo: 'codigo', valor: '' };
    tiposFotos = ['archivo'];
    tipoFotoSeleccionado='archivo'
    foto = { name: '', data: '' };

    constructor(private navController: NavController, private menu: MenuController,
        private itemService: ItemService,
        private platform: Platform,
        private http: Http,
      public toastCtrl: ToastController) {
          if(!this.platform.is('mobile')){
              this.tiposFotos = ['archivo'];

          }
          else {
              this.tiposFotos = ['cámara'];
          }
        this.itemsTemporal = this.items;


    }

    openMenu() {
        this.menu.open();
    }

    presentToast(text : string) {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }

    listar() {
      this.items =[]
      return  this.itemService.getItems(this.navController).then(items => { this.items = items; return items })
    }

    crear() {
        let validator = new Validator();
        this.itemNuevo.Stock=0;
        if (!validator.isValid(this.itemNuevo)){ this.presentToast('Corrija el formulario');}
      //  else if (this.itemNuevo.Stock < 1 || this.itemNuevo.Stock > 50 || this.itemNuevo.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
        else {

            //let item = JSON.parse(JSON.stringify(this.itemNuevo))
            if(this.foto.name!='')
            this.itemNuevo.Imagen = this.foto
            else this.itemNuevo.Imagen=null
            this.itemService.createItem(this.itemNuevo,this.navController).then(result => {
              //let r = result  as ITEM
              //let r =  JSON.parse(JSON.stringify(result))  as ITEM
              //this.itemService.uploadImagen(r.url,this.itemNuevo.Imagen,this.navController)
              this.listar();
              this.presentToast('item creado correctamente');
            });
            this.template = 'null';
            this.itemNuevo = new ITEM();
            this.foto = { name: '', data: '' };
        }
    }
    camara(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 300,
        targetHeight: 300
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.foto.name = new Date().toDateString();
        this.foto.data = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
    }

    fileChange(input: any){
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(input.files[0]);

          // Create a FileReader
          // Create a FileReader
           var reader: any;// target: EventTarget;
           reader = new FileReader();

          // Add an event listener to deal with the file when the reader is complete
          reader.addEventListener("load", (event) => {
              // Get the event.target.result from the reader (base64 of the image)
              img.src = event.target.result;

              // Resize the image
              var resized_img = this.resize(img);

              // Push the img src (base64 string) into our array that we display in our html template
              this.foto.name=input.files[0].name
              this.foto.data=resized_img

          }, false);

          reader.readAsDataURL(input.files[0]);
    }
    resize (img, MAX_WIDTH:number = 300, MAX_HEIGHT:number = 300){
        var canvas = document.createElement("canvas");

        console.log("Size Before: " + img.src.length + " bytes");

        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');
        // IMPORTANT: 'jpeg' NOT 'jpg'
        console.log("Size After:  " + dataUrl.length  + " bytes");
        return dataUrl
    }

    //abre el html de modificar
    goModificar(item: ITEM) {
      for(var key in item){
        this.itemModificar[key]= item[key]
      }
        this.itemModificar = JSON.parse(JSON.stringify(item))
        this.template = 'modificar'
    }

    modificar() {
        let validator = new Validator();
        if (!validator.isValid(this.itemModificar)) this.presentToast('Corrija el formulario');
      //  else if (this.itemModificar.Stock < 1 || this.itemModificar.Stock > 50 || this.itemModificar.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
        else {
            this.presentToast('Datos modificados correctamente');
            this.itemService.updateItem(this.itemModificar,this.navController).then(result => this.listar());
            this.template = 'null';
        }
    }

    eliminar() {
        for (var item of this.itemsEliminar) {
            this.itemService.eliminarItem(item,this.navController).then(result =>
            { this.listar();
              this.presentToast('Se ha eliminado con éxito');
            }).catch(error => console.log(error))
        }
        //se deja en blanco la lista a eliminar
        this.itemsEliminar = Array<ITEM>();
        //se refrescan los datos del servidor
        this.listar();
    }


    select(item: ITEM) {
        if (!this.itemsEliminar.some(it => it == item)) {
            this.itemsEliminar.push(item);
        } else {
            let index = this.itemsEliminar.findIndex(x => x == item)
            this.itemsEliminar.splice(index, 1)
        };
    }

  //generar codigo para el siguiente item
    generarCodigoItem(){
      // var codigoAnterior;
       let nuevoCodigo;
       //getUltimoCodItem : retorna el ultimo codigo para sumarle 1 para el nuevoC
       this.itemService.getUltimoCodItem(this.navController).then(codigoAnterior => {
        codigoAnterior = codigoAnterior + 1;
        nuevoCodigo = codigoAnterior;
        if(nuevoCodigo > 0 && nuevoCodigo < 10){
          this.itemNuevo.Codigo= "000" + nuevoCodigo.toString(); // 1 - 9
        }else if(nuevoCodigo >= 10 && nuevoCodigo < 100){
          this.itemNuevo.Codigo= "00" + nuevoCodigo.toString(); //10 - 99
        }else if(nuevoCodigo >= 100 && nuevoCodigo < 1000){
          this.itemNuevo.Codigo= "0" + nuevoCodigo.toString();  //100 - 999
        }else if(nuevoCodigo >= 1000 && nuevoCodigo < 8001){
          this.itemNuevo.Codigo= nuevoCodigo.toString();  //1000 - 8000
        }
     });
    }


    goCrearItem() {
        this.template = 'crear';
        this.generarCodigoItem();
    }

    cancelar() {
        this.itemNuevo = new ITEM();
        this.template = 'null';
    }


    buscar() {
        if (this.busqueda.valor.trim() != "") {
            this.itemService.getBuscarItem(this.busqueda.valor,this.navController)
            .then(items => { this.items = items as ITEM[];
               return items })
        }
        else { this.listar() }
    }

    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
        this.listar();
    }
}
