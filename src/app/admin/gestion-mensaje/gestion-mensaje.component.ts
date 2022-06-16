import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { Comentario } from 'src/app/web/interfaces/juego';
import { AmistadService } from 'src/app/web/services/amistad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-mensaje',
  templateUrl: './gestion-mensaje.component.html',
  styleUrls: ['./gestion-mensaje.component.css']
})
export class GestionMensajeComponent implements OnInit {

  mensaje!:Comentario;
  busqueda!:number;
  carga!:boolean;
  emisor!:string;
  texto!:string;
  dialogo!:boolean;

  constructor(private servicioMensaje:AmistadService, private router:Router, private servicioLogin:LoginService) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.emisor=resp.correo; 
      
    })
  }

  buscar(x:any){
    this.busqueda= x.target.value

    this.servicioMensaje.getMensaje(this.busqueda).subscribe({
      next: (resp => {
        this.mensaje=resp
        this.carga=true
          }),
    error: resp=> {
      Swal.fire(
        '¡Error!', resp.error.mensaje , 'error'
      );
    }
    })
    this.router.navigateByUrl('/admin_comment');
    

  }

  borrar(id:number){
    this.servicioMensaje.borrarMensaje(id, this.mensaje.usuarioReceptor.correo).subscribe({
      next: (resp => {
        Swal.fire(
          '', 'Has borrado el comentario', 'success'
        );
        this.carga=false 
    }),
    error: resp=> {
      Swal.fire(
        '¡Error!', resp.error.mensaje, 'error'
      );
    }
    })
  }

  mandarMensaje(){
    this.servicioMensaje.mandarMensaje(this.emisor,this.mensaje.usuarioReceptor.correo,this.texto).subscribe({
      next: (resp => {
        this.notificar()
        Swal.fire(
          '', 'Se ha mandado tu mensaje', 'success'
        );
    }),
    error: resp=> {
      Swal.fire('Error', resp.error.mensaje, 'error')
    }
    })
  }


  
  notificar(){
    this.dialogo = !this.dialogo;
  }  


}
