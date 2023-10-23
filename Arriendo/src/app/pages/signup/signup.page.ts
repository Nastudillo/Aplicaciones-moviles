import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator,UntypedFormBuilder, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formularioregistro: FormGroup;

  constructor(public fb:FormBuilder, public alertController: AlertController) {
    this.formularioregistro=this.fb.group({
      'nombre':new FormControl("",Validators.required),
      'password':new FormControl("",Validators.required),
      'confirm':new FormControl("",Validators.required)
    });
   }

 
  async guardar(){

    var f = this.formularioregistro.value;

    if(this.formularioregistro.invalid){
      const alert = await this.alertController.create({
        message:'llena todo',
        buttons:['aceptar']
      });
      await alert.present();
      return;
    }
    var usuario={
      nombre: f.nombre,
      password: f.password
    }
    
    localStorage.setItem('usuario',JSON.stringify(usuario));
    
  }
    //variables
    darkMode = false;
  

    ngOnInit(): void{
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
}
