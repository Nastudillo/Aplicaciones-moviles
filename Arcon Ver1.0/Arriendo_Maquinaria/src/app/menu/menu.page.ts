import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  data: any;
  // searchMQ(event){
  //   const text = event.target.value;
  //   this.searchM = this.maqui;
  //   if(text && text.trim() != ''){
  //     this.searchM = this.searchM.filter(maqui: any)=>{
  //       return (user.name.tolowercase().indexDF(text.tolowercase())) > -1
  //     }
  //   }
  // }
  ngOnInit(): void {
    this.checkAppMode();
  }
  
  darkMode= false;

  checkAppMode(){
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  cambio() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      localStorage.setItem('darkModeActivated', 'true');
    }else{
      localStorage.setItem('darkModeActivated', 'false');
    }
  
  }
  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una suscripción
    this.activateRoute.queryParams.subscribe(params =>{//utilizo lambda
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
        console.log(this.data)
      }//else{
        //this.router.navigate(["/home"]);
     // }
    });
  }

  elim(){
    
    localStorage.removeItem('rut');
    localStorage.removeItem('run');
    localStorage.removeItem('name');
    localStorage.removeItem('lastname');
    localStorage.removeItem('bird');
  }
  
}
