import { Component, OnInit } from '@angular/core';
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

  constructor(private servicio:BuscadorService) { }

  ngOnInit(): void {
    this.cargaDatos()
  }

  cargaDatos(){
    this.servicio.obtenerMasVotados().subscribe((resp) => {
      this.masVotado = resp;
      this.carga=true
    });
  }

  obtenerImagen(juego:Juego){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
    const source = `data:image/png;base64,${base64String}`+juego.imagen;
    return source;
  }

  

}
