import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { AmistadService } from '../services/amistad.service';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cadena:string= ''; 
  usuario!:string; 
  rol!:string; 
  mySidenav:any; 
  numMensaje!:number;
 




  constructor(private servicioLogin: LoginService, private servicioBusqueda: BuscadorService, private router: Router, private servicioAmistad:AmistadService) { }

  //Cargamos de inicio el usuario por token y un elemento de DOM para abrir y cerrar la hamburguesa cuando se muestre
  // en pantallas prqueñas
  ngOnInit(): void {

    this.mySidenav =window.document.getElementById("mySidenav")!;


    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp.nick; 
      this.rol=resp.rol
      this.servicioAmistad.cargarMensajes(resp.nick).subscribe((data)=>
      this.numMensaje=data.length)
    }
    )
  }

  logout(){
    this.servicioLogin.logout(); 
  }

  verUser(){
    this.router.navigateByUrl('/usuario');
  }

  verVotos(){
    this.router.navigateByUrl('/mis_votos');
  }

  verMensajes(){
    this.router.navigateByUrl('/mensajes');
  }


  verSeguidores(){
    this.router.navigateByUrl('/seguidores');
  }

  verJuegos(){
    this.router.navigateByUrl('/lista_juegos');
  }

  masVotados(){
    this.router.navigateByUrl('/mas_votados');
  }

  mejorValorados(){
    this.router.navigateByUrl('/mejor_valorados');
  }

  quiz(){
    this.router.navigateByUrl('/quiz');
  }

  //Método para buscar un juego
  buscar(x:any){
    this.cadena= x.target.value

    this.servicioBusqueda.buscarJuego(this.cadena); 
    this.router.navigateByUrl('/resultados');


  }

  //Métodos para abrir y cerrar la hamburguesa
  openNav() {
    this.mySidenav.style.width = "70%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  closeNav() {
  this.mySidenav.style.width = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
  }


}
