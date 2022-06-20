import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
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
pages: number = 1;
home!:MenuItem;
items:MenuItem[]=[]


  constructor(private servicioLogin:LoginService, private servicioUser:ServUserService, private servicioBuscador:BuscadorService,
    private ruta:ActivatedRoute,  private router: Router, private messageService:MessageService) { }

  ngOnInit(): void {

    this.referencia=this.ruta.snapshot.params['referencia']

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.cargarLista();
      this.cargarJuegos();
      this.carga=true;
      this.home = {icon: 'pi pi-home', routerLink: '/main'};
    }
    )
  }

  cargarLista(){
    this.servicioUser.getListado(this.usuario.nick,this.referencia).subscribe((resp)=>{
      this.lista=resp;
      this.items = [
        {label: this.usuario.nick, routerLink:'/usuario'},
        {label: 'Mis listas', routerLink:'/listas'},
        {label: this.lista.nombre, routerLink:'/lista/'+resp.referencia},
      ]
    }
    )

  }

  borrarLista(){
    this.servicioUser.borrarListado(this.usuario.nick,this.referencia).subscribe({
      next: (resp => {
        this.messageService.add({key: 'listaBorrada', severity:'success', detail:'Has borrado la lista'});

        this.router.navigateByUrl('/listas');

    }),
    error: resp=> {

      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail: resp.error.mensaje});
    }
    })
  }
  

  cargarJuegos(){
    this.listaRef=[]
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
          this.messageService.add({key: 'addJuego', severity:'success', detail:'Has añadido el juego'});
        this.cargarLista();
        this.cargarJuegos();
        this.juegosObtenidos=[]
      }),
      error: resp=> {
        this.messageService.add({key: 'error', severity:'error', summary:'Error', detail: resp.error.mensaje});
      }
      })
    }

    quitarList(refJuego:number){
      this.servicioUser.addJuegoLista(this.usuario.correo,refJuego,this.referencia).subscribe({
        next: (resp => {
          this.messageService.add({key: 'quitJuego', severity:'success', detail:'Has quitado el juego'});
        this.cargarLista();
        this.cargarJuegos();
        this.juegosObtenidos=[]
        
      }),
      error: resp=> {
        this.messageService.add({key: 'error', severity:'error', summary:'Error', detail: resp.error.mensaje});

      }
      })
    }


    obtenerAvatar(usuario:Usuario){
      const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
      const source = `data:image/png;base64,${base64String}`+usuario.avatar;
      return source;
    }

    obtenerImagen(juego:Juego){
      const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
      const source = `data:image/png;base64,${base64String}`+juego.imagen;
      return source;
    }
  

}
