import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  perfil = {
    rut:'',
    nombre: '',
    apellido: '',
    direccion:'',
    correo:''
  };

  guardarPerfil() {
    // Aquí puedes procesar y guardar los datos del perfil
    console.log('Perfil guardado', this.perfil);
  }

}
