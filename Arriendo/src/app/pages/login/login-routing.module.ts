import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LOginPage } from './login.page';


const routes: Routes = [
  {
    path: '',
    component: LOginPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LOginPageRoutingModule { }
