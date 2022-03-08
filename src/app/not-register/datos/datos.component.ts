import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Juego } from 'src/app/web/interfaces/juego';
import { DatatableService } from '../services/datatable.service';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  datosJuegos: Juego[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();



  constructor(private servicio : DatatableService) { }

  ngOnInit(): void {
    
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 2,
    responsive: true,
    language: {
      url: '/assets/es-ES.json'
    }
    }

    this.datos();

    
   
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }

  //Método para cargar los datos de nuestra base de datos y traspasárselos
  //a la datatable
  datos(){
    this.servicio.datos().subscribe((resp) => {
      this.datosJuegos = resp;
      this.dtTrigger.next(this.datosJuegos);
    });
  }
  

  goBack() {
    window.history.back();
  }


 
}
