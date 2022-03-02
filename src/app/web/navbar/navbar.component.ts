import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cadena:string= ''; 
  usuario!:string; 



  constructor(private servicioLogin: LoginService, private servicioBusqueda: BuscadorService, private router: Router) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp.nick; 
    }
    )
  }

  logout(){
    this.servicioLogin.logout(); 
  }

  buscar(x:any){
    this.cadena= x.target.value

    this.servicioBusqueda.buscarJuego(this.cadena); 
    this.router.navigateByUrl('/resultados');


  }


}
