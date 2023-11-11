import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotfundPageRoutingModule } from './notfund-routing.module';

import { NotfundPage } from './notfund.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotfundPageRoutingModule
  ],
  declarations: [NotfundPage]
})
export class NotfundPageModule {}
