import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DatatableService } from 'src/app/not-register/services/datatable.service';
import { Juego } from '../interfaces/juego';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.css']
})
export class ListaJuegosComponent implements OnInit {

  datosJuegos: Juego[] = [];
  carga!:boolean
  items:MenuItem[]=[]
  home!: MenuItem;


  constructor(private servicio : DatatableService, private router: Router) { }

  ngOnInit(): void {

    this.datos();
    this.home = {icon: 'pi pi-home', routerLink: '/main'};

  }

  datos(){
    this.servicio.datos().subscribe((resp) => {
      this.datosJuegos = resp;
      this.carga=true;
      this.items = [
        {label: 'Lista de juegos', routerLink:'/lista_juegos'},
      ]
    });
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
