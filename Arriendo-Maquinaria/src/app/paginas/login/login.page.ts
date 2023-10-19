import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router) {
    this.router.navigate(['/login/iniciar']);
  }

  cambio($event: any){
    let direccion = $event.detail.value;
    this.router.navigate(['/login/'+direccion]);
  }

}
