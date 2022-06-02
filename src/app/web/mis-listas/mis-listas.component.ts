import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private servicio:ServUserService, private servicioLogin: LoginService, private router:Router) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.cargarListado();
      this.carga=true;
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


}
