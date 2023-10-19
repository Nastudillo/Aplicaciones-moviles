import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  username: string = '';
  password: string = '';

}
