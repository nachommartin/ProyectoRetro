import { Component, OnDestroy, OnInit } from '@angular/core';
import { Juego } from 'src/app/web/interfaces/juego';
import { DatatableService } from '../services/datatable.service';
import {Subject} from 'rxjs';
import { lenguaje } from '../lenguaje';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit, OnDestroy {

  datosJuegos: Juego[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();



  constructor(private servicio : DatatableService) { }

  ngOnInit(): void {
    this.datos();

    
   
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }

  datos(){
    this.servicio.datos().subscribe((resp) => {
      this.datosJuegos = resp;
      this.dtTrigger.next(this.datosJuegos);
    });
  }
  

 
}
