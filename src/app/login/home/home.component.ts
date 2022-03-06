import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //Inicialmente este iba a ser la página inicial, pero finalmente decidí dejar este módulo para Login y Registro
  //y realizar uno nuevo para la página inical y la datatable, por lo que en un futuro tengo que restructurar esto
  //para que en este módulo no exista el componente Home

}
