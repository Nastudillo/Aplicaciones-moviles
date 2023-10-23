import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LOginPage implements OnInit {

  //variables
  darkMode = false;


  ngOnInit(): void {
    this.checkAppMode()
  }

  async checkAppMode() {
    // const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    const checkIsDarkMode = await Preferences.get({ key: 'darkModeActivated' });
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      Preferences.set({ key: 'darkModeActivated', value: 'true' });
    } else {
      //localStorage.setItem('darkModeActivated', 'false');
      Preferences.set({ key: 'darkModeActivated', value: 'false' });
    }
  }

  formulariologin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public NavController: NavController,) {
    this.formulariologin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)

    })
  }



  async ingresar() {
    var f = this.formulariologin.value;

    // Obtener el objeto usuario del almacenamiento local
    var usuarioString = localStorage.getItem('usuario');
    //redirijir a la cosa


    if (usuarioString) { // Verificar si existe un usuario en el almacenamiento local
      var usuario = JSON.parse(usuarioString);

      if (usuario && usuario.nombre && usuario.password) { // Verificar que el objeto usuario y sus propiedades existan
        if (usuario.nombre === f.nombre && usuario.password === f.password) {
          console.log('Ingresado');
          this.NavController.navigateRoot('/home')
        } else {
          const alert = await this.alertController.create({
            header: 'Datos incorrectos',
            message: 'Los datos que ingresaste son incorrectos.',
            buttons: ['Aceptar']
          });

          await alert.present();
        }
      } else {
        // Manejo de caso en el que el objeto usuario no tiene las propiedades esperadas
        console.log('El objeto usuario no tiene las propiedades esperadas.');
      }
    } else {
      // Manejo de caso en el que no existe un objeto usuario en el almacenamiento local
      console.log('No hay usuario en el almacenamiento local.');
    }
  }
}

