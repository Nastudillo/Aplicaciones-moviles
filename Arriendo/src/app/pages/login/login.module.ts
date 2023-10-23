import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LOginPageRoutingModule } from './login-routing.module';

import { LOginPage } from './login.page';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LOginPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LOginPage]
})
export class LOginPageModule { }
