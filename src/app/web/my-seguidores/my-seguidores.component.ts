import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
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



  constructor(private servicioLogin: LoginService, private servicioAmistad: AmistadService, private router: Router,
    private messageService:MessageService) { }

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
        this.messageService.add({key: 'follow', severity:'success', detail:'Has seguido al usuario'});
   }),
   error: resp=> {
    this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:'Ha habido un error inesperado'});

    
   }
   })
 }

 unfollow(usuario:string){
  this.servicioAmistad.unfollowUsuario(usuario, this.usuario.correo).subscribe({
   next: (resp => {
    this.datos()
    this.messageService.add({key: 'unfollow', severity:'success', detail:'Has dejado de seguir al usuario'});

 }),
 error: resp=> {
  this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:'Ha habido un error inesperado'});

 }
 })

}


obtenerAvatar(usuario:Usuario){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
  const source = `data:image/png;base64,${base64String}`+usuario.avatar;
  return source;
}



}
