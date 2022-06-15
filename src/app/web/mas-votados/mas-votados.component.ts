import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Juego } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-mas-votados',
  templateUrl: './mas-votados.component.html',
  styleUrls: ['./mas-votados.component.css']
})
export class MasVotadosComponent implements OnInit {

  masVotado:Juego[]=[]
  carga:boolean=false
  items:MenuItem[]=[]
  home!: MenuItem;

  constructor(private servicio:BuscadorService) { }

  ngOnInit(): void {
    this.cargaDatos()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};
  }

  cargaDatos(){
    this.servicio.obtenerMasVotados().subscribe((resp) => {
      this.masVotado = resp;
      this.carga=true
      this.items = [
        {label: 'Más votados', routerLink:'/mas_votados'},
      ]
    });
  }

  obtenerImagen(juego:Juego){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
    const source = `data:image/png;base64,${base64String}`+juego.imagen;
    return source;
  }

  

}
