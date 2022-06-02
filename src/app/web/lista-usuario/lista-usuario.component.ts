import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { Juego, Listado, Usuario } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  stalkeado!:Usuario;
  nickStalkeado!:string
  listas:Listado[]=[]
  sizeArray:number=0;
  carga:boolean=false
  listaRef:number[]=[];
  arrayDeArrays:Array<Juego>[]=[]

  constructor(private ruta:ActivatedRoute, private servicioFollow: AmistadService, 
    private servicioUser:ServUserService) { }

  ngOnInit(): void {

    this.nickStalkeado=this.ruta.snapshot.params['usuario']
    this.cargarStalkeado()

    
  }

  cargarStalkeado(){
    this.servicioFollow.obtenerUsuario(this.nickStalkeado).subscribe((resp)=> {
      this.stalkeado=resp
      this.cargarListado()
      this.carga=true;
      })
    
  }

  cargarListado(){
    this.servicioUser.cargarListas(this.stalkeado.nick).subscribe((resp)=>{
      for (var i = 0; i < resp.length; i++) {
      if(resp[i].publico==true){
        this.listas.push(resp[i]); 
        }
      }
      this.sizeArray=resp.length
      for (var i = 0; i < this.listas.length; i++) {
        this.listaRef.push(this.listas[i].referencia);        
      }
  
      for (var i = 0; i < this.listaRef.length; i++) {
        this.servicioUser.getJuegosListado(this.stalkeado.nick,this.listaRef[i]).subscribe((resp)=>{
          this.arrayDeArrays.push(resp);
      }
      
        )
    }

    }
    )
  }


  
}
