import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { Votacion } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css']
})
export class VotosComponent implements OnInit {

  nickStalkeado!:string;
  stalker!:string
  stalkeado!:string
  votos:Votacion[]=[]
  carga:boolean=false;
  sizeArray:number=0;


  constructor(private ruta: ActivatedRoute, private servicioLogin:LoginService, 
    private servicioFollow: AmistadService) { }

  ngOnInit(): void {

    this.nickStalkeado=this.ruta.snapshot.params['stalkeado']
    this.cargarStalkeado()

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.stalker=resp.correo; 
      
    })

  }

  cargarStalkeado(){
    this.servicioFollow.obtenerUsuario(this.nickStalkeado).subscribe((resp)=> {
      this.stalkeado=resp.correo
      this.servicioFollow.verVotos(this.stalker, this.stalkeado).subscribe({
        next: (resp => {
          this.votos=resp
          this.sizeArray=resp.length;
          this.carga=true; 
      }),
      error: resp=> {
        Swal.fire(
          '¡Error!', 'No tienes acceso a ver estos votos', 'error'
        );
      }
      })
    })
    
  }


  


}
