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

//De inicio cogemos el título del juego desde la ruta URL para así cargar el juego
  ngOnInit(): void {

    this.titulo=this.ruta.snapshot.params['titulo']
    
    this.cargarJuego()
   


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
//Método para cargar las reseñas
    cargarReview(ref:number){
      this.servicioVoto.obtenerReviewsJuego(ref).
      subscribe((resp)=>{
        this.reviewsJuego=resp;
        this.sizeArray=resp.length

      }
      );

      }

    //Método para volver hacia atrás al juego
      goBack() {
        window.history.back();
      }


}