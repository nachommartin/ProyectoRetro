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

  ngOnInit() {

    this.titulo=this.ruta.snapshot.params['titulo']
    this.buscador.obtenerJuego(this.titulo)
    
 


  }

  get juegoAMostrar(){
    return this.buscador.juegoObtenido
    }

  }



  


