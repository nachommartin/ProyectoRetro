import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Comentario } from 'src/app/web/interfaces/juego';
import { AmistadService } from 'src/app/web/services/amistad.service';

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

  constructor(private servicioMensaje:AmistadService, private router:Router, private servicioLogin:LoginService, 
    private messageService:MessageService) { }

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
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
    }
    })
    this.router.navigateByUrl('/admin_comment');
    

  }

  borrar(id:number){
    this.servicioMensaje.borrarMensaje(id, this.mensaje.usuarioReceptor.correo).subscribe({
      next: (resp => {
        this.messageService.add({key: 'delete', severity:'success', detail:'Has borrado la reseña'});

        this.carga=false 
    }),
    error: resp=> {
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
    }
    })
  }

  mandarMensaje(){
    this.servicioMensaje.mandarMensaje(this.emisor,this.mensaje.usuarioReceptor.correo,this.texto).subscribe({
      next: (resp => {
        this.notificar()
        this.messageService.add({key: 'send', severity:'success', detail:'Se ha mandado tu mensaje'});
    }),
    error: resp=> {
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
    }
    })
  }


  
  notificar(){
    this.dialogo = !this.dialogo;
  }  


}
