import { NgModule } from '@angular/core';
import {Platform, MenuController, Nav, IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {UsuarioPage} from './pages/usuario/usuario';
import {PersonaPage} from './pages/persona/persona';
import {InventarioPage} from './pages/inventario/inventario';
import {KitPage} from './pages/kit/kit';
import {ItemPage} from './pages/item/item';
import {MaterializeDirective} from "../../materialize-directive";
import {InventarioService} from '../inventario/inventario.service';
import {PersonaService} from '../persona/persona.service';
import {ItemService } from '../item/item.service';
import {KitService } from '../kit/kit.service';
import {UsuarioService } from '../usuario/usuario.service';
import {DatePicker} from 'ionic-native';
import {PrestamoService} from './prestamo.service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
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
