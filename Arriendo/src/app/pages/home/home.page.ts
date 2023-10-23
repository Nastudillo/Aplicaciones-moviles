import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { IniciarService } from 'src/app/services/iniciar.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
//variables
usuario: any;
darkMode = false;
constructor(private router: Router,public navCtrl: NavController,private IniciarService:IniciarService) {
  this.router.navigate(['/home/tienda']);
 }

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

cambiodepagina($event: any) {
  let direccion = $event.detail.value;
  this.router.navigate(['/home/' + direccion]);
}
// getLocalData(){
//   this.IniciarService.getJsonData().subscribe(res: any) => ([
//     alert(JSON.stringfy(res))
//   ])
// }
}
