import { NgModule } from '@angular/core';
import {Platform, MenuController, Nav, IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import {LoginPage} from '../pages/login/login';
import {UsuarioPage} from '../pages/usuario/usuario';
import {PersonaPage} from '../pages/persona/persona';
import {InventarioPage} from '../pages/inventario/inventario';
import {KitPage} from '../pages/kit/kit';
import {ItemPage} from '../pages/item/item';
import {MaterializeDirective} from "../../materialize-directive";
import {InventarioService} from '../providers/inventario.service';
import {PersonaService} from '../providers/persona.service';
import {ItemService } from '../providers/item.service';
import {KitService } from '../providers/kit.service';
import {UsuarioService } from '../providers/usuario.service';
import {DatePicker} from 'ionic-native';
import {PrestamoService} from '../providers/prestamo.service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UsuarioPage,
    KitPage,
    ItemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UsuarioPage,
    KitPage,
    ItemPage
  ],
  providers: [
PersonaService, ItemService, InventarioService, UsuarioService, KitService,PrestamoService,Storage


  ],

})
export class AppModule {}
