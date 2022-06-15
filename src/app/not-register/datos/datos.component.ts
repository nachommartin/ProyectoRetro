import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Juego } from 'src/app/web/interfaces/juego';
import { DatatableService } from '../services/datatable.service';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MenuItem } from 'primeng/api';
import { ViewEncapsulation } from '@angular/compiler';
import { Router } from '@angular/router';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  datosJuegos: Juego[] = [];
  items:MenuItem[]=[]
  carga!:boolean




  constructor(private servicio : DatatableService, private router: Router) { }

  ngOnInit(): void {
    
    
    this.datos();
    this.items = [
      {
          items: [{
              label: 'Volver al inicio',
              icon: 'pi pi-step-backward',
              command: () => {
                  this.goBack();
              }
          }
      ]}]

    
   
  }

  

  //Método para cargar los datos de nuestra base de datos y traspasárselos
  //a la datatable
  datos(){
    this.servicio.datos().subscribe((resp) => {
      this.datosJuegos = resp;
      this.carga=true;
    });
  }
  

  goBack() {
    this.router.navigateByUrl('/');
  }

  obtenerImagen(juego:Juego){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
    const source = `data:image/png;base64,${base64String}`+juego.imagen;
    return source;
  }

  applyFilterGlobal($event: any, stringVal: any,  dt: any) {
    dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }


 
}
