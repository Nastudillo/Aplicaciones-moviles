import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RegistrarComponent } from 'src/app/componentes/registrar/registrar.component';
import { IniciarComponent } from 'src/app/componentes/iniciar/iniciar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, RegistrarComponent, IniciarComponent]
})
export class LoginPageModule {}
