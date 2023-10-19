import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { RegistrarComponent } from 'src/app/componentes/registrar/registrar.component';
import { IniciarComponent } from 'src/app/componentes/iniciar/iniciar.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    children :[
      {
        path:'registrar',
        component: RegistrarComponent
      },
      {
        path:'iniciar',
        component: IniciarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
