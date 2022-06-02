import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { Juego, Listado, Usuario } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

carga:boolean=false;
usuario!:Usuario;
referencia!:number;
lista!:Listado;
juegos:Juego[]=[];
juegosObtenidos:Juego[]=[];
sizeArray:number=0;
juegoArray:boolean=false;
cadena:string= ''; 
resultados:Juego[]=[];
listaRef:number[]=[]



  constructor(private servicioLogin:LoginService, private servicioUser:ServUserService, private servicioBuscador:BuscadorService,
    private ruta:ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {

    this.referencia=this.ruta.snapshot.params['referencia']

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.cargarLista();
      this.cargarJuegos();
      this.carga=true;
    }
    )
  }

  cargarLista(){
    this.servicioUser.getListado(this.usuario.nick,this.referencia).subscribe((resp)=>{
      this.lista=resp;
    }
    )

  }

  borrarLista(){
    this.servicioUser.borrarListado(this.usuario.nick,this.referencia).subscribe({
      next: (resp => {
        Swal.fire(
          '', 'Has borrado la lista', 'success'
        );
        this.router.navigateByUrl('/listas');

    }),
    error: resp=> {
      Swal.fire(
        '¡Error!', resp.error.mensaje, 'error'
      );
    }
    })
  }
  

  cargarJuegos(){
    this.servicioUser.getJuegosListado(this.usuario.nick,this.referencia).subscribe((resp)=>{
      this.juegos=resp;
      this.sizeArray=resp.length
      for (var i = 0; i < resp.length; i++) {
        this.listaRef.push(resp[i].referencia);
     }
    }
    )

  }

  buscar(x:any){
  this.cadena= x.target.value

    this.servicioBuscador.buscadorJuegos(this.cadena).subscribe((resp)=>{
      this.juegosObtenidos= resp;
      if(resp.length>0){
        this.juegoArray=false
      }
    }
  );
    this.router.navigateByUrl('/lista/'+this.referencia);
    
  }

  

    addList(refJuego:number){
      this.servicioUser.addJuegoLista(this.usuario.correo,refJuego,this.referencia).subscribe({
        next: (resp => {
          Swal.fire(
            '', 'Has añadido el juego', 'success'
          );
        this.cargarLista();
        this.cargarJuegos();
        this.juegosObtenidos=[]
      }),
      error: resp=> {
        Swal.fire(
          '¡Error!', resp.error.mensaje, 'error'
        );
      }
      })
    }

    quitarList(refJuego:number){
      this.servicioUser.addJuegoLista(this.usuario.correo,refJuego,this.referencia).subscribe({
        next: (resp => {
          Swal.fire(
            '', 'Has quitado el juego', 'success'
          );
        this.cargarLista();
        this.cargarJuegos();
        this.juegosObtenidos=[]
      }),
      error: resp=> {
        Swal.fire(
          '¡Error!', resp.error.mensaje, 'error'
        );
      }
      })
    }

}
