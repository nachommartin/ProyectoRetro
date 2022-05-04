import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { AmistadService } from '../services/amistad.service';

@Component({
  selector: 'app-envio-mensaje',
  templateUrl: './envio-mensaje.component.html',
  styleUrls: ['./envio-mensaje.component.css']
})
export class EnvioMensajeComponent implements OnInit {

  texto!:string; 
  receptorNick!:string;
  receptor!:string;
  emisor!:string;

  constructor(private ruta:ActivatedRoute, private servicioFollow:AmistadService, 
    private servicioLogin:LoginService, private router: Router) { }

  ngOnInit(): void {
    this.receptorNick=this.ruta.snapshot.params['receptor']
    this.cargarReceptor();
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.emisor=resp.correo; 
      
    })

  }

  cargarReceptor(){
    this.servicioFollow.obtenerUsuario(this.receptorNick).subscribe((resp)=> {
      this.receptor=resp.correo}
    )
  }

  mandarMensaje(){
    this.servicioFollow.mandarMensaje(this.emisor,this.receptor,this.texto).subscribe({
      next: (resp => {
        Swal.fire(
          '', 'Se ha mandado tu mensaje', 'success'
        );
        this.router.navigateByUrl('/main');
    }),
    error: resp=> {
      Swal.fire('Error', resp.error.mensaje, 'error')
    }
    })
  }

  

}
