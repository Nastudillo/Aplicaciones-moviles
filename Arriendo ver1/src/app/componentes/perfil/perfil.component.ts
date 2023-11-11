import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  formPerfil: FormGroup;
  constructor(public fb: FormBuilder, public alertController: AlertController) {
    this.formPerfil = this.fb.group({
      'rut': new FormControl("", Validators.required),
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'direccion': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
    });
  }

  ngOnInit() { }




  async guardarPerfil() {
    var f = this.formPerfil.value;
    // Aquí puedes procesar y guardar los datos del perfil
    console.log('Perfil guardado', this.formPerfil);
    var perfil = {
      rut: f.rut,
      nombre: f.nombre,
      apellido: f.apellido,
      direccion: f.direccion,
      correo: f.correo,

    }
    localStorage.setItem('Perfil', JSON.stringify(perfil));
  }

}
