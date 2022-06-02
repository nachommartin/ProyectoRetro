import { Component, OnInit } from '@angular/core';
import { Juego } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-mejor-media',
  templateUrl: './mejor-media.component.html',
  styleUrls: ['./mejor-media.component.css']
})
export class MejorMediaComponent implements OnInit {

  mejorMedia:Juego[]=[]
  carga:boolean=false

  constructor(private servicio:BuscadorService) { }

  ngOnInit(): void {
    this.cargaDatos()
  }

  
  cargaDatos(){
    this.servicio.obtenerMejorMedia().subscribe((resp) => {
      this.mejorMedia = resp;
      this.carga=true
    });
  }

  obtenerImagen(juego:Juego){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
    const source = `data:image/png;base64,${base64String}`+juego.imagen;
    return source;
  }

}
