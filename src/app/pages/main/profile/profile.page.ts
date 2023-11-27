import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  form = new FormGroup({
    
    
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  async takeImage() {

    let user = this.user();

    let path = `users/${user.uid}`

    const dataUrl = (await this.utilsSvc.takePicture('Imagen de Perfil')).dataUrl;

    const loading = await this.utilsSvc.loading();
    await loading.present();
    let imagenPath = `${user.uid}/profile`;
    user.imagen = await this.firebaseSvc.uploadImage(imagenPath, dataUrl);

    this.firebaseSvc.updateDocument(path, { imagen: user.imagen }).then(async res => {

      this.utilsSvc.saveInLocalStorage('user', user);

      this.utilsSvc.presentToast({
        message: 'Imagen Actualizada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'

      })


    }).catch(error => {
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        position: 'middle',
        icon: 'alert-circle-outline'

      })

    }).finally(() => {
      loading.dismiss();
    })
  }

  enviarCorreoTerminos(){

    let user = this.user()


    const templateParams = {
      nombre_usuario: user.name,
      mail_usuario: user.email,
      text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  emailjs.send('service_fhjd3c9','template_3na95bk', templateParams,'_ZByTdFiwZNBW3KD4')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       this.utilsSvc.presentToast({
        message: 'Se ha enviado a su correo los terminos y condiciones',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'

      })

    }, (err) => {
       console.log('FAILED...', err);
       this.utilsSvc.presentToast({
        message: 'Se produjo un error al mandar el correo',
        duration: 2500,
        position: 'middle',
        icon: 'alert-circle-outline'

      })
    });

  }

  
  
}
