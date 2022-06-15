import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { FollowCredentials, Usuario } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';

@Component({
  selector: 'app-my-seguidores',
  templateUrl: './my-seguidores.component.html',
  styleUrls: ['./my-seguidores.component.css']
})
export class MySeguidoresComponent implements OnInit {

  usuario!: Usuario;
  carga:boolean=false;  
  followers: FollowCredentials[]=[];
  items:MenuItem[]=[]
  pages: number = 1;
  home!: MenuItem;



  constructor(private servicioLogin: LoginService, private servicioAmistad: AmistadService, private router: Router) { }

  ngOnInit(): void {
    this.datos()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};

  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true
      this.cargarFollowers()
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Mis Seguidores', routerLink:'/seguidores'},
    ];

    }
    )

  }

  cargarFollowers(){
    this.servicioAmistad.getFollowers(this.usuario.correo).subscribe((resp)=>
    this.followers=resp)

  }

  follow(usuario:string){
    this.servicioAmistad.followUsuario(usuario, this.usuario.correo).subscribe({
     next: (resp => {
        this.datos()
       Swal.fire(
         '', 'Has seguido al usuario', 'success'
       );
   }),
   error: resp=> {
     Swal.fire(
       '¡Error!', 'Ha habido un error inesperado', 'error'
     );
   }
   })
 }

 unfollow(usuario:string){
  this.servicioAmistad.unfollowUsuario(usuario, this.usuario.correo).subscribe({
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


obtenerAvatar(usuario:Usuario){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
  const source = `data:image/png;base64,${base64String}`+usuario.avatar;
  return source;
}



}
