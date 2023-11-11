import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PerfilComponent } from 'src/app/componentes/perfil/perfil.component';
import { TiendaComponent } from 'src/app/componentes/tienda/tienda.component';

import { ReactiveFormsModule } from '@angular/forms';
import { QRComponent } from 'src/app/componentes/qr/qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage, PerfilComponent, TiendaComponent, QRComponent]
})
export class HomePageModule {}
