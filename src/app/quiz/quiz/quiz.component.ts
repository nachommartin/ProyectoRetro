import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Question, Respuesta } from '../interfaces/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  preguntas:Question[]=[];
  nombreQuiz!:string;
  carga!:boolean
  respuestas:Respuesta[]=[]
  puntos:number=0
  dialog!:boolean
  ref!:number
  items:MenuItem[]=[]
  home!: MenuItem;

  constructor(private servicio:QuizService, private messageService:MessageService,
    private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.ref=this.ruta.snapshot.params['ref']

    this.loadQuiz() 
    this.home = {icon: 'pi pi-home', routerLink: '/main'};
   
  }

  loadQuiz(){
    this.servicio.getQuiz(this.ref).subscribe((resp)=>{
      this.nombreQuiz= resp.name;
      this.items = [
        {label: 'Quiz MegaDriver', routerLink:'/quiz'},
        {label: resp.name, routerLink:'/quiz/'+resp.name},
    ];
    } );

    this.servicio.getPreguntas(this.ref).subscribe((resp)=>{
      this.preguntas= resp;
      this.carga=true;
      
    } );
    

  }

  cargarRespuestas(e:any){
    let refP:number=this.preguntas[e.index-1].ref
    if(refP>-1){
    this.servicio.getRespuestas(this.ref,refP).subscribe((resp)=>{
      this.respuestas= resp;
    
      
    } );
  }
  }

  checkRespuesta(respuesta:Respuesta, pregunta:Question){
    if(respuesta.text.normalize()===pregunta.respuestaCorrect.text.normalize()){
      this.puntos=this.puntos+5;
      this.messageService.add({key: 'correcto', severity:'success', summary: 'Correcto', detail: "Has ganado 5 puntos"});
      this.preguntas[pregunta.orden-1].isValid=true;

      if(this.preguntas[0].isValid==true && this.preguntas[1].isValid==true && this.preguntas[2].isValid==true && this.preguntas[3].isValid==true){
        this.sumarPuntos()
      }
  
            
    }
    
    else{
      this.puntos=this.puntos-1;
      this.messageService.add({key: 'error', severity:'error', summary: 'Incorrecto', detail: "Pierdes un punto"});
      this.preguntas[pregunta.orden-1].isValid=true;

      if(this.preguntas[0].isValid==true && this.preguntas[1].isValid==true && this.preguntas[2].isValid==true && this.preguntas[3].isValid==true){
        this.sumarPuntos()
      }

    }

  }

  sumarPuntos(){
    this.servicio.sumarPuntos(this.puntos).subscribe((resp)=>{
      
    })
    this.dialog=!this.dialog;
  }

}
