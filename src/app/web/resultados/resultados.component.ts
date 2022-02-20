import { Component, OnInit } from '@angular/core';
import { Juego } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {


  constructor(private buscador:BuscadorService) { }

  ngOnInit(): void {
  }

  get juegosObtenidos(){
    return this.buscador.datosJuegos
    }


}
