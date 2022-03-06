import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

 
  opciones:string[]=["Sonic","Axel","Gilius"];

//Elemento que emite el evento
  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {}

//Método que recoge el evento y el componente a traspasar para que se 
//recupere en el elemento padre
  select(opcion:string) { 
    this.selected.emit(opcion);


  }



}
