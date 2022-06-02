import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { Comentario } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  mensajes:Comentario[]=[];
  nick!:string;
  receptor!:string
  sizeArray:number=0;
  numero:number=0;
  carga:boolean=false;

  constructor(private servicioFollow:AmistadService, private servicioLogin:LoginService, 
    private servicioUsuario:ServUserService) { }

  ngOnInit(): void {
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.nick=resp.nick; 
      this.receptor=resp.correo
      this.cargarMensajes()

      
    })
  }


  cargarMensajes(){
    this.servicioFollow.cargarMensajes(this.nick).subscribe((resp)=>{
    this.mensajes=resp,
    this.sizeArray=resp.length
    this.carga=true
    })
  }

  borrar(id:number){
    this.servicioFollow.borrarMensaje(id, this.receptor).subscribe({
      next: (resp => {
        Swal.fire(
          '', 'Has borrado el comentario', 'success'
        );
    }),
    error: resp=> {
      Swal.fire(
        '¡Error!', 'Ha habido un error inesperado', 'error'
      );
    }
    })
  }

  reportar(id:number){
    let mensaje:string="mensaje"
    this.servicioUsuario.reportar(id,mensaje,this.nick).subscribe({
      next: (resp => {
        Swal.fire(
          '', 'El administrador revisará tu reporte', 'success'
        );
    }),
    error: resp=> {
      Swal.fire(
        '¡Error!', 'Ha habido un error inesperado', 'error'
      );
    }
    })
  }
  

}
