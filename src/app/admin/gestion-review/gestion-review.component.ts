import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { Votacion } from 'src/app/web/interfaces/juego';
import { AmistadService } from 'src/app/web/services/amistad.service';
import Swal from 'sweetalert2';
import { AdminJuegoService } from '../services/admin-juego.service';

@Component({
  selector: 'app-gestion-review',
  templateUrl: './gestion-review.component.html',
  styleUrls: ['./gestion-review.component.css']
})
export class GestionReviewComponent implements OnInit {
  busqueda!:number;
  review!:Votacion
  carga!:boolean;
  texto!:string;
  emisor!:string;
  receptor!:string
  cadena!:string;
  dialogo!:boolean;
  dialogoEdit!:boolean;
  seleccionado!:Votacion
  textoEdicion!:string


  constructor(private servicioAdmin:AdminJuegoService, private router:Router, private servicioMensaje:AmistadService,
    private servicioLogin:LoginService) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.emisor=resp.correo; 
      
    })
  }

  buscar(x:any){
    this.busqueda= x.target.value

    this.servicioAdmin.getVoto(this.busqueda).subscribe({
      next: (resp => {
        if(resp.review==null){
          Swal.fire(
            '¡Error!', "No existe esa reseña", 'error'
          );
        }
        else{
        this.review=resp
        this.carga=true
        }
          }),
    error: resp=> {
      Swal.fire(
        '¡Error!', "No existe esa reseña", 'error'
      );
    }
    })
    this.router.navigateByUrl('/admin_review');
    

  }

  mandarMensaje(){
    this.servicioMensaje.obtenerUsuario(this.cadena).subscribe((resp)=>{
      this.receptor=resp.correo
      this.servicioMensaje.mandarMensaje(this.emisor,this.receptor,this.texto).subscribe({
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
    })
    
  }

  notificar(){
    this.dialogo = !this.dialogo;
  }  

  borrar(id:number){
    this.servicioAdmin.quitarReview(id).subscribe({
      next: (resp => {
        Swal.fire(
          '', 'Has borrado la reseña', 'success'
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

  seleccionarParaEditar(voto:Votacion){
    this.seleccionado = voto;
    this.textoEdicion=voto.review
    this.dialogoEdit=!this.dialogoEdit;
  }

  editarReview(){
    this.servicioAdmin.editarReview(this.seleccionado.codigo, this.textoEdicion).subscribe({
      next: (resp => {
        this.dialogoEdit=!this.dialogoEdit;
        Swal.fire(
          '', 'Has editado la reseña', 'success'
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
  


}
