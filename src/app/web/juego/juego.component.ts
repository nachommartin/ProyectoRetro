import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { Juego, Votacion } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';
import { VotacionService } from '../services/votacion.service';
import { MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, private buscador: BuscadorService, 
    private servicioVoto: VotacionService, private servicio:LoginService, 
    private router: Router, private messageService: MessageService) { }

  titulo!:string;
  carga:boolean= false; 
  juegoCargado!:Juego;
  options:any[] = [
    { name: "No jugado", id: 0 },
    { name: 1, id: 1 },
    { name: 2, id: 2 },
    { name: 3, id: 3 },
    { name: 4, id: 4 },
    { name: 5, id: 5 },
    { name: 6, id: 6 },
    { name: 7, id: 7 },
    { name: 8, id: 8 },
    { name: 9, id: 9 },
    { name: 10, id: 10 }
  ];
  opcionElegida:number=0;
  usuario!:string; 
  votosUsuario:Votacion[]=[];
  votoAislado!:Votacion;
  notaUsuario!:number
  nota!:boolean;
  review!:string; 
  items:MenuItem[]=[]
  home!: MenuItem;


//De inicio cogemos el título del juego desde la ruta URL para así cargar el juego
//así como cargamos el usuario desde el token para que pueda votar/reseñar el juego
  ngOnInit() {

    this.titulo=this.ruta.snapshot.params['titulo']
    this.home = {icon: 'pi pi-home', routerLink: '/main'};
    this.cargarJuego()   

  }

//Cuando se carga el juego ponemos el booleano carga en true para que se muestre
// en el template
  cargarJuego(){
    this.servicio.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp.correo; 
      this.mostrarVotacionUsuario()
    }
    )
    this.buscador.obtenerJuego(this.titulo).
    subscribe((resp)=> {
      this.juegoCargado=resp[0];
      this.carga=true
      this.items = [
        {label: resp[0].titulo, routerLink:'/juego/'+resp[0].titulo},
      ]

    }
);

    }

    selectOption(opcion:number) {
      this.opcionElegida=opcion;
    }

//Método para votar
    votar(){
     this.servicioVoto.votarJuego(this.juegoCargado.referencia,this.opcionElegida,this.usuario).subscribe({
      next: (resp => {
        if(resp.voto==0){
          this.messageService.add({key: 'voto0', severity:'info', detail:'Has indicado que no has jugado el juego'});
          this.cargarJuego()
          this.mostrarVotacionUsuario()

        }
        else{ 
          this.messageService.add({key: 'votoCorrecto', severity:'success', detail:'Has votado el juego'});
        this.cargarJuego()
        this.mostrarVotacionUsuario()
        }
    }),
    error: resp=> {
      this.messageService.add({key: 'errorVoto', severity:'error', detail:'Ha habido un error con el voto'});
    }
    })
    
  }
    
  

//Método para mostrar si el usuario ha votado ya el juego, si no lo está
//el auxiliar booleano sigue falso y se muestra un mensaje correspondiente
//de que no se ha votado en el template
 mostrarVotacionUsuario(){
    let aux!:Votacion[]; 
    this.servicioVoto.obtenerVotacionesUsuario(this.usuario).subscribe((data)=>{
      this.votosUsuario=data;
      })
    aux= this.votosUsuario.filter(v =>v.juego.titulo ===this.titulo)
    if (aux.length>0){
    this.votoAislado= aux[0];
    this.notaUsuario=this.votoAislado.voto;
    this.nota=true
  }
  else{
    this.nota=false;
  }

  }

//Método para añadir una reseña, el resultado se muestra por Sweet Alert
  addReview(){
    this.servicioVoto.incluirReview(this.juegoCargado.referencia, this.review,this.usuario).
    subscribe({
      next: (resp => {
        this.messageService.add({key: 'reviewOk', severity:'success', detail:'Se ha incluido tu reseña'});
        this.getReview(this.juegoCargado.titulo)
    }),
    error: resp=> {
      this.messageService.add({key: 'reviewFail', severity:'error', summary:'Error', detail:resp.error.mensaje});
    }
    })
  }

  getReview(pk:any){
    
    this.router.navigate(["./review/",pk]);
  }

  obtenerImagen(juego:Juego){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
    const source = `data:image/png;base64,${base64String}`+juego.imagen;
    return source;
  }


}



  


