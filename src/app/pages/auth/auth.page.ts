import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        

        this.getUserInfo(res.user.uid)

      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: 'Error al iniciar sesión',
          duration: 2500,
          position: 'middle',
          icon: 'alert-circle-outline'

        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async setUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

      this.utilsSvc.saveInLocalStorage('user', this.form.value);
      this.utilsSvc.routerLink('/main/home');
      this.form.reset();


      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: 'Error al iniciar sesión',
          duration: 2500,
          position: 'middle',
          icon: 'alert-circle-outline'

        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async getUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      

      this.firebaseSvc.getDocument(path).then((user: User) => {

      this.utilsSvc.saveInLocalStorage('user', user);
      this.utilsSvc.routerLink('/main/home');
      this.form.reset();

      this.utilsSvc.presentToast({
        message: `te damos la bienvenida ${user.name}`,
        duration: 1500,
        position: 'middle',
        icon: 'person-circle-outline'

      })


      }).catch(error => {
        console.log(error);

        this.utilsSvc.presentToast({
          message: 'Ocurrio un error',
          duration: 2500,
          position: 'middle',
          icon: 'alert-circle-outline'

        })

      }).finally(() => {
        loading.dismiss();
      })
    }
  }
}
