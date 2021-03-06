import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Question, Quiz, Respuesta,  } from 'src/app/quiz/interfaces/quiz';
import { QuizService } from 'src/app/quiz/services/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  respuestas:Respuesta[]=[]
  seleccionado!:Respuesta
  dialogoGuardado!:boolean
  enunciadoRespuesta!:string
  editEnunciadoRespuesta!:string
  dialogoEdit!:boolean
  quiz!:Quiz;
  question!:Question;
  ref!:number;
  refQ!:number;
  carga!:boolean;


  constructor(private servicio:QuizService, private confirmationService:ConfirmationService, private route: ActivatedRoute,
    private messageService:MessageService) { }

  ngOnInit(): void {

    this.ref=this.route.snapshot.params['ref']
    this.refQ=this.route.snapshot.params['refQ']
    this.loadQuiz()
  
  }

  loadQuiz(){
    this.servicio.getQuiz(this.ref).
    subscribe((resp)=> {
      this.quiz=resp;
      this.loadQuestion(resp.ref, this.refQ);
      
    })
    }

    loadQuestion(resp:number, ref:number){
      this.servicio.getPregunta(resp,ref).subscribe((data)=> {
        console.log(data);        
        this.question=data; 
        
        this.loadRespuestas(resp, data.ref)       
      })

  }

  loadRespuestas(resp:number, ref:number){
    this.servicio.getRespuestas(resp,ref).subscribe((data)=> {
      this.respuestas=data;  
      this.carga=true;      
    })

    this.respuestas.sort((a,b)=> {
      if (a.orden>b.orden) {
        return -1;
      }
      if (a.orden<b.orden) {
        return 1;
      }
      return 0;
    });

}

findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.respuestas.length; i++) {
      if (this.respuestas[i].referencia === id) {
          index = i;
          break;
      }
  }

  return index;
}

applyFilterGlobal($event: any, stringVal: any,  dt: any) {
dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
}


confirmar(refResp: number) {
this.confirmationService.confirm({
    message: '??Est??s seguro que quieres eliminar esta respuesta?',
    header: 'Confirmaci??n',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Si',
    accept: () => {
        this.borrarRespuesta(refResp);
    },
    reject: () => {

    }
});
}

borrarRespuesta(refResp:number){
  this.servicio.borrarRespuesta(this.ref, this.refQ, refResp).subscribe({
    next: (resp => {
      this.loadQuiz();
      }),
    error: resp=> {
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});

    }
    })
  
}

seleccionarRespuestaEditar(resp:Respuesta){
  this.dialogoEdit=!this.dialogoEdit;
  this.seleccionado = resp;
  this.editEnunciadoRespuesta=this.seleccionado.text
}

editarRespuesta(){
  this.servicio.editarRespuesta(this.ref,this.refQ,this.seleccionado.referencia,this.editEnunciadoRespuesta).subscribe({
  next: (resp => {
    this.loadQuiz();
    this.dialogoEdit = !this.dialogoEdit;
  }),
  error: resp=> {
    this.dialogoEdit = !this.dialogoEdit;

    this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
  }
  })
}

addRespuesta(){
  if(this.respuestas.length<4){ 
  this.servicio.guardarRespuesta(this.ref, this.refQ, this.enunciadoRespuesta, this.respuestas.length+1).subscribe({
  next: (resp => {
    this.loadQuiz();
    this.guardar()
    }),
  error: resp=> {
    this.guardar()
    this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
  }
  })
  }
  else{
    this.guardar()
    this.messageService.add({key: 'errorSize', severity:'error', summary:'Error', detail:'Una pregunta no debe tener m??s de cuatro respuestas'});
  }
  }

  guardar(){
    this.dialogoGuardado=!this.dialogoGuardado
  }

}
