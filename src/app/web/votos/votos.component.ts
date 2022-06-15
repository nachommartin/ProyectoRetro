import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { Juego, Votacion } from '../interfaces/juego';
import { AmistadService } from '../services/amistad.service';

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css']
})
export class VotosComponent implements OnInit {

  nickStalkeado!:string;
  stalker!:string
  stalkeado!:string
  votos:Votacion[]=[]
  carga:boolean=false;
  sizeArray:number=0;
  items:MenuItem[]=[]
  pages: number = 1;
  home!: MenuItem;


  constructor(private ruta: ActivatedRoute, private servicioLogin:LoginService, 
    private servicioFollow: AmistadService) { }

  ngOnInit(): void {

    this.nickStalkeado=this.ruta.snapshot.params['stalkeado']
    this.cargarStalkeado()

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.stalker=resp.correo; 
      this.items = [
        {label: 'Comunidad', routerLink:'/comunidad'},
        {label: 'Votos de '+ this.nickStalkeado, routerLink:'/votos/'+this.nickStalkeado},
    ];
      
    })
    this.home = {icon: 'pi pi-home', routerLink: '/main'};


  }

  cargarStalkeado(){
    this.servicioFollow.obtenerUsuario(this.nickStalkeado).subscribe((resp)=> {
      this.stalkeado=resp.correo
      this.servicioFollow.verVotos(this.stalker, this.stalkeado).subscribe({
        next: (resp => {
          this.votos=resp
          this.sizeArray=resp.length;
          this.carga=true; 
      }),
      error: resp=> {
        Swal.fire(
          '¡Error!', 'No tienes acceso a ver estos votos', 'error'
        );
      }
      })
    })
    
  }

  nota(voto:Votacion){
    let nota:string;
    if (voto.voto >4 && voto.voto<8){
      nota="REGULAR"
    }
    else if(voto.voto<4){
      nota="MALA"
    }
    else{
      nota="BUENA"
    }
    return nota; 
    }
  
  

    obtenerImagen(juego:Juego){
      const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
      const source = `data:image/png;base64,${base64String}`+juego.imagen;
      return source;
    }
    
    
styleCard = {'background-color': '#f7f7f5', 'width':'80%',  'margin-left': 'auto',
'margin-right': 'auto', 'display': 'block', 'margin-top':'0.625rem', 'margin-bottom':'0.625rem'}


}
