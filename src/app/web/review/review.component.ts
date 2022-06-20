import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Juego, Votacion } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';
import { ServUserService } from '../services/serv-user.service';
import { VotacionService } from '../services/votacion.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  titulo!:string;
  carga:boolean= false; 
  juegoCargado!:Juego;
  reviewsJuego:Votacion[]=[];
  sizeArray:number=0;
  reportador!:string
  pages: number = 1;
  items:MenuItem[]=[]
  home!: MenuItem;




  constructor(private buscador:BuscadorService, private ruta:ActivatedRoute, private servicioVoto:VotacionService,
    private servicioUsuario:ServUserService, private servicioLogin:LoginService, private messageService:MessageService) { }

//De inicio cogemos el título del juego desde la ruta URL para así cargar el juego
  ngOnInit(): void {

    this.titulo=this.ruta.snapshot.params['titulo']
    
    this.cargarJuego()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};


    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.reportador=resp.nick; 
      
    })
   


  }

  cargarJuego(){
    this.buscador.obtenerJuego(this.titulo).
    subscribe((resp)=> {
      this.cargarReview(resp[0].referencia);
      this.juegoCargado=resp[0];
      this.carga=true;
      this.items = [
        {label: resp[0].titulo, routerLink:'/juego/'+resp[0].titulo},
        {label: 'Reseñas de '+ resp[0].titulo, routerLink:'/review/'+resp[0].titulo}, 
      ]
      
  

    }
);


    }
//Método para cargar las reseñas
    cargarReview(ref:number){
      this.servicioVoto.obtenerReviewsJuego(ref).
      subscribe((resp)=>{
        this.reviewsJuego=resp;
        this.sizeArray=resp.length
      }
      );

      }

    //Método para volver hacia atrás al juego
      goBack() {
        window.history.back();
      }

      reportar(id:number){
        let mensaje:string="reseña"
        this.servicioUsuario.reportar(id,mensaje, this.reportador).subscribe({
          next: (resp => {
            this.messageService.add({key: 'sendReport', severity:'success', detail:'El administrador revisará tu reporte'});

        }),
        error: resp=> {
          this.messageService.add({key: 'error', severity:'error', summary:'Error', detail: 'Ha habido un error inesperado'});


        }
        })
      }


}
