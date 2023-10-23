import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfundPage } from './notfund.page';

const routes: Routes = [
  {
    path: '',
    component: NotfundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotfundPageRoutingModule {}
