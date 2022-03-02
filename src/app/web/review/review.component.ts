import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego, Votacion } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  titulo!:string;
  carga:boolean= false; 
  juegoCargado!:Juego;
  reviewsJuego:Votacion[]=[];



  constructor(private buscador:BuscadorService, private ruta:ActivatedRoute) { }

  ngOnInit(): void {

    this.titulo=this.ruta.snapshot.params['titulo']
    
    this.cargarJuego()

    this.reviewsJuego=this.juegoCargado.votos

  }

  cargarJuego(){
    this.buscador.obtenerJuego(this.titulo).
    subscribe((resp)=> {
      this.juegoCargado=resp[0];
      this.carga=true

    }
);

    }


}
