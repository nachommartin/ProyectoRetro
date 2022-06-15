import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Juego, Usuario, Votacion } from '../interfaces/juego';
import { VotacionService } from '../services/votacion.service';

@Component({
  selector: 'app-my-votos',
  templateUrl: './my-votos.component.html',
  styleUrls: ['./my-votos.component.css']
})
export class MyVotosComponent implements OnInit {
  usuario!:Usuario;
  votos:Votacion[]=[]
  carga!:boolean;
  items:MenuItem[]=[]
  pages: number = 1;
  home!: MenuItem;

  constructor(private servicioLogin:LoginService, private servicioVotos:VotacionService, private router:Router) { }

  ngOnInit(): void {
    this.datos()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};

  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Mis Votos', routerLink:'/mis_votos'},
    ];
    this.cargaVotos(resp.correo)
    }
    )
  }

  cargaVotos(correo:string){
  this.servicioVotos.obtenerVotacionesUsuario(correo).
  subscribe((resp)=>{
    this.votos=resp; 
    this.carga=true
  })
}

volverAVotar(voto:Votacion){
  this.router.navigate(["./juego/",voto.juego.titulo]);

}

//El símbolo menor que (<) me sale en rojo en el template como si estuviera deprecado y no me lo interpreta Angular, he tenido que desarrollar esta función
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


styleCard = {'background-color': '#f7f7f5', 'width':'80%',  'margin-left': 'auto',
'margin-right': 'auto', 'display': 'block', 'margin-top':'0.625rem', 'margin-bottom':'0.625rem'}


obtenerImagen(juego:Juego){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
  const source = `data:image/png;base64,${base64String}`+juego.imagen;
  return source;
}

}
