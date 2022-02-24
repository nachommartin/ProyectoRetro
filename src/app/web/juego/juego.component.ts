import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { Juego } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';
import { VotacionService } from '../services/votacion.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, private buscador: BuscadorService, 
    private servicioVoto: VotacionService, private servicio:LoginService) { }

  titulo!:string;
  carga:boolean= false; 
  juegoCargado!:Juego;
  options:any[] = [
    { name: 1, id: 1 },
    { name: 2, id: 2 },
    { name: 3, id: 3 },
    { name: 4, id: 4 },
    { name: 5, id: 5 },
    { name: 6, id: 6 },
    { name: 7, id: 7 },
    { name: 8, id: 8 },
    { name: 9, id: 9 },
    { name: 10, id: 10 }
  ];
  opcionElegida:number=0;
  usuario!:string; 



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

    selectOption(opcion:number) {
      this.opcionElegida=opcion;
    }

    votar(){
      this.servicio.obtenerUsuarioPorToken().
      subscribe((resp)=>{
        this.usuario=resp; 
        console.log(this.usuario)
      }
      )

      this.servicioVoto.votarJuego(1,this.opcionElegida,this.usuario);
    }
  

  }



  


