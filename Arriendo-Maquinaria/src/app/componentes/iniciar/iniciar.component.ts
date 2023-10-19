import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.scss'],
})
export class IniciarComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  username: string = '';
  password: string = '';

}
