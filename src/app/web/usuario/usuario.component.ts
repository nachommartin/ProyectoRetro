import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
  items: MenuItem[]=[];
  home!: MenuItem;



  constructor(private servicioLogin: LoginService) { }

  ngOnInit(): void {

    this.datos()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};
  
  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
    ];

    }
    )
  }

  obtenerImagen(usuario:Usuario){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
    const source = `data:image/png;base64,${base64String}`+usuario.avatar;
    return source;
  }


}
