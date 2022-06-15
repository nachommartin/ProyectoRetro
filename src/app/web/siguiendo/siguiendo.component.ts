import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
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


  constructor(private servicioLogin:LoginService, private servicioFollow:AmistadService) { }

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
       Swal.fire(
         '', 'Has dejado de seguir al usuario', 'success'
       );
   }),
   error: resp=> {
     Swal.fire(
       '¡Error!', 'Ha habido un error inesperado', 'error'
     );
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
