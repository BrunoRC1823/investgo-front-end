import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent{
  slider = [
    {
      url: 'assets/img/slider-image01.png',
      text: '¿Listo para conseguir financiamiento o invertir?',
      urlAlt: 'slider01',
    },
    {
      url: 'assets/img/slider-image02.png',
      text: '¡Diversifica e invierte en facturas negociables!',
      urlAlt: 'slider03',
    },
    {
      url: 'assets/img/slider-image03.png',
      text: '¡Encuentra la solución financiera que te beneficie!',
      urlAlt: 'slider04',
    },
  ];

}
