import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IniciarService {
 constructor(private http: HttpClient){}

 getJsonData(){
  return this.http.get('../assets/usuarios.json')
 }
}
