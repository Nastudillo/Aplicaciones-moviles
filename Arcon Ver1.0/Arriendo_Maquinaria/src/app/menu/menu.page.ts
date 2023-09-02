import { Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage  {
  data:any;
  
  searchM:any;

  maqui: any =[];

  datos:any={
    nombre:"",
    apellido:"",
    educacion:"",
    nacimiento:""
  };
  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    // Se llama a la ruta activa y se obtiene sus parametros mediante una suscripción
    this.activateRoute.queryParams.subscribe(params =>{//utilizo lambda
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.["user"];
        console.log(this.data)
      }else{
        this.router.navigate(["/login"]);
      }
    });
  }

  // searchMQ(event){
  //   const text = event.target.value;
  //   this.searchM = this.maqui;
  //   if(text && text.trim() != ''){
  //     this.searchM = this.searchM.filter(maqui: any)=>{
  //       return (user.name.tolowercase().indexDF(text.tolowercase())) > -1
  //     }
  //   }
  // }
  
}
