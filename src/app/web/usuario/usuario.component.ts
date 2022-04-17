import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/services/login.service';
import { Usuario} from '../interfaces/juego';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario;
  carga:boolean=false;  


  constructor(private servicioLogin: LoginService) { }

  ngOnInit(): void {

    
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true

    }
    )
  }

}
