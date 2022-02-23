import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, private buscador: BuscadorService) { }

  titulo!:string;
  carga:boolean= false; 
  juegoCargado!:Juego;


  ngOnInit() {

    this.titulo=this.ruta.snapshot.params['titulo']
    this.cargarJuego()



  }

  cargarJuego(){
    this.buscador.obtenerJuego(this.titulo).
    subscribe((resp)=> {
      this.juegoCargado=resp[0];
      this.carga=true
      console.log(resp)

    }
);

    }

  }



  


