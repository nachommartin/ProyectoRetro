import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Listado, Usuario } from '../interfaces/juego';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-mis-listas',
  templateUrl: './mis-listas.component.html',
  styleUrls: ['./mis-listas.component.css']
})
export class MisListasComponent implements OnInit {

  listas:Listado[]=[];
  sizeArray:number=0;
  usuario!:Usuario;
  carga:boolean=false;
  home!:MenuItem
  items:MenuItem[]=[]

  constructor(private servicio:ServUserService, private servicioLogin: LoginService, private router:Router) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.cargarListado();
      this.carga=true;
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Mis listas', routerLink:'/listas'},
      ]
      this.home = {icon: 'pi pi-home', routerLink: '/main'};
    }
    )
  }

  cargarListado(){
    this.servicio.cargarListas(this.usuario.nick).subscribe((resp)=>{
      this.listas=resp; 
      this.sizeArray=resp.length

    }
    )
  }

  getLista(pk:any){
    
    this.router.navigate(["./lista/",pk]);
  }

  crear(){
    
    this.router.navigate(["./crear_lista"]);
  }

  obtenerImagen(usuario:Usuario){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
    const source = `data:image/png;base64,${base64String}`+usuario.avatar;
    return source;
  }

}
