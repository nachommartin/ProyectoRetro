import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Comentario, Usuario } from '../interfaces/juego';
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
  items:MenuItem[]=[]
  pages: number = 1;
  home!: MenuItem;

  constructor(private servicioFollow:AmistadService, private servicioLogin:LoginService, 
    private servicioUsuario:ServUserService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.nick=resp.nick; 
      this.receptor=resp.correo
      this.cargarMensajes()
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Mis mensajes', routerLink:'/mensajes'},
      ]
      this.home = {icon: 'pi pi-home', routerLink: '/main'};

      
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
        this.cargarMensajes()
        this.messageService.add({key: 'borrado', severity:'success', detail:'Has borrado el comentario'});
    }),
    error: resp=> {
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:'Ha habido un error inesperado'});
    }
    })
  }

  reportar(id:number){
    let mensaje:string="mensaje"
    this.servicioUsuario.reportar(id,mensaje,this.nick).subscribe({
      next: (resp => {
        this.messageService.add({key: 'sendReport', severity:'success', detail:'El administrador revisará tu reporte'});
    }),
    error: resp=> {
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:'Ha habido un error inesperado'});
    }
    })
  }

  styleCard = {'background-color': '#f7f7f5', 'width':'80%',  'margin-left': 'auto',
'margin-right': 'auto', 'display': 'block', 'margin-top':'0.625rem', 'margin-bottom':'0.625rem'}


obtenerAvatar(usuario:Usuario){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
  const source = `data:image/png;base64,${base64String}`+usuario.avatar;
  return source;
}

}
