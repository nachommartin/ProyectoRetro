import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Amistad, Usuario } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';

@Component({
  selector: 'app-siguiendo',
  templateUrl: './siguiendo.component.html',
  styleUrls: ['./siguiendo.component.css']
})
export class SiguiendoComponent implements OnInit {

  usuario!: Usuario;
  carga:boolean=false;  
  seguidos: Amistad[]=[];
  items:MenuItem[]=[]
  pages: number = 1;
  home!: MenuItem;


  constructor(private servicioLogin:LoginService, private servicioFollow:AmistadService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.datos();
    this.home = {icon: 'pi pi-home', routerLink: '/main'};
    
  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true
      this.cargarSeguidos()
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Usuarios seguidos', routerLink:'/siguiendo'},
    ];

    }
    )
  }

  unfollow(usuario:string){
    this.servicioFollow.unfollowUsuario(usuario, this.usuario.correo).subscribe({
     next: (resp => {
      this.datos()
      this.messageService.add({key: 'unfollow', severity:'success', detail:'Has dejado de seguir al usuario'});
       
   }),
   error: resp=> {
    this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:'Ha habido un error inesperado'});

   }
   })
  
  }


  cargarSeguidos(){
    this.servicioFollow.getSeguidos(this.usuario.correo).subscribe((resp)=>
    this.seguidos=resp)

  }

  obtenerAvatar(usuario:Usuario){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
    const source = `data:image/png;base64,${base64String}`+usuario.avatar;
    return source;
  }
  
  

}
