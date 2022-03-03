import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';
import { Juego, Votacion } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';
import { VotacionService } from '../services/votacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  constructor(private ruta: ActivatedRoute, private buscador: BuscadorService, 
    private servicioVoto: VotacionService, private servicio:LoginService, 
    private router: Router) { }

  titulo!:string;
  carga:boolean= false; 
  juegoCargado!:Juego;
  options:any[] = [
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



  ngOnInit() {

    this.titulo=this.ruta.snapshot.params['titulo']
    this.cargarJuego()

    this.servicio.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp.correo; 
    }
    )

   

  }

  cargarJuego(){
    this.buscador.obtenerJuego(this.titulo).
    subscribe((resp)=> {
      this.juegoCargado=resp[0];
      this.carga=true

    }
);

    }

    selectOption(opcion:number) {
      this.opcionElegida=opcion;
    }

    votar(){
     this.servicioVoto.votarJuego(this.juegoCargado.referencia,this.opcionElegida,this.usuario).subscribe({
      next: (resp => {
        console.log("Juego votado correctamente")
    }),
    error: resp=> {
      console.log('Error inesperado')
    }
    })
    this.refresh();
  }
    
  refresh(): void {
    setTimeout(function(){window.location.reload()}, 500)
}

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

  addReview(){
    this.servicioVoto.incluirReview(this.juegoCargado.referencia, this.review,this.usuario).
    subscribe({
      next: (resp => {
        console.log("Juego reseñado correctamente")
    }),
    error: resp=> {
      Swal.fire('Error', resp.error.mensaje, 'error')
    }
    })
    //this.refresh();
  }

  getReview(pk:any){
    
    this.router.navigate(["/review/",pk]);
  }


}



  


