import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego, Votacion } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';
import { VotacionService } from '../services/votacion.service';

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
  sizeArray:number=0;



  constructor(private buscador:BuscadorService, private ruta:ActivatedRoute, private servicioVoto:VotacionService) { }

  ngOnInit(): void {

    this.titulo=this.ruta.snapshot.params['titulo']
    
    this.cargarJuego()
    console.log(this.sizeArray)
   


  }

  cargarJuego(){
    this.buscador.obtenerJuego(this.titulo).
    subscribe((resp)=> {
      this.cargarReview(resp[0].referencia);
      this.juegoCargado=resp[0];
      this.carga=true;
      
  

    }
);


    }

    cargarReview(ref:number){
      this.servicioVoto.obtenerVotacionesJuego(ref).
      subscribe((resp)=>{
        this.reviewsJuego=resp;
        this.sizeArray=resp.length

      }
      );

      }

      
    


}
