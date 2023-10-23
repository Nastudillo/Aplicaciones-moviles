import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PerfilComponent } from 'src/app/componentes/perfil/perfil.component';
import { TiendaComponent } from 'src/app/componentes/tienda/tienda.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path:'perfil',
        component: PerfilComponent
      },
      {
        path:'tienda',
        component: TiendaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
