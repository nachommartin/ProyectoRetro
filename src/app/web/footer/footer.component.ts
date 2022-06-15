import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import { Usuario } from '../interfaces/juego';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  usuario!:Usuario;
  carga!:boolean;

  constructor(private servicioLogin:LoginService) { }

  ngOnInit(): void {
    this.datos()
  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true
    }
    )
  }

}
