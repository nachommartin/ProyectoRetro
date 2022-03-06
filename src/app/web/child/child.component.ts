import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

 
  opciones:string[]=["Sonic","Axel","Gilius"];


  @Output()
  selected: EventEmitter<string> = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {}

  select(opcion:string) { 
    this.selected.emit(opcion);


  }



}
