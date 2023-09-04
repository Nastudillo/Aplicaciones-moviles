import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage{

  ngOnInit(){
    console.log('run',this.run)
  }
  data:any;
  run=localStorage.getItem('rut');
  name=localStorage.getItem('nombre');
  lastname=localStorage.getItem('apellido');
  bird=localStorage.getItem('nacimiento');

  rut="";
  nombre="";
  apellido="";
  nacimiento="";
  
  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    
  }

  guardar(){
    
    localStorage.setItem('rut',this.rut)
    localStorage.setItem('name',this.nombre)
    localStorage.setItem('lastname',this.apellido)
    localStorage.setItem('bird',this.nacimiento)

  }

  
}
