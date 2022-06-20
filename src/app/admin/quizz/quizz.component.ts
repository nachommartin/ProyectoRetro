import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Question, Quiz, Respuesta } from 'src/app/quiz/interfaces/quiz';
import { QuizService } from 'src/app/quiz/services/quiz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  questions:Question[]=[]
  quiz!:Quiz
  seleccionado!:Question
  dialogoGuardado!:boolean
  enunciadoQuestion!:string;
  editEnunciadoQuestion!:string
  dialogoEdit!:boolean;
  ref!:number;
  carga!:boolean;
  respuestas:Respuesta[]=[];
  dialogoRespCorrecta!:boolean;
  selectResp!:Respuesta;

  constructor(private servicio:QuizService, private confirmationService:ConfirmationService, private router: Router,
    private route:ActivatedRoute, private messageService:MessageService ) { }

  ngOnInit(): void {
    this.ref=this.route.snapshot.params['ref']
    this.loadQuiz()
    

  }

  loadQuiz(){
    this.servicio.getQuiz(this.ref).
    subscribe((resp)=> {
      this.quiz=resp;

      this.carga=true;
      this.loadQuestionsQuiz(resp.ref);
    })
    }

    loadQuestionsQuiz(resp:number){
      this.servicio.getPreguntas(resp).subscribe((data)=> {
        this.questions=data;        
      })


  
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].ref === id) {
            index = i;
            break;
        }
    }

    return index;
}

  applyFilterGlobal($event: any, stringVal: any,  dt: any) {
  dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
}


confirmar(idQuestion: number) {
  this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar esta pregunta?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
          this.borrarPregunta(idQuestion);
      },
      reject: () => {

      }
  });
}

borrarPregunta(refQ:number){
  this.servicio.borrarPregunta(this.ref, refQ).subscribe({
    next: (resp => {
      this.loadQuiz();
      }),
    error: resp=> {
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
    }
    })
  
}

seleccionarQuestionEditar(question:Question){
  this.dialogoEdit = !this.dialogoEdit;
  this.seleccionado = question;
  this.editEnunciadoQuestion=this.seleccionado.texto
}

addQuestion(){
  if(this.questions.length<4){ 
  this.servicio.guardarPregunta(this.ref, this.enunciadoQuestion, this.questions.length+1).subscribe({
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
    this.messageService.add({key: 'errorSize', severity:'error', summary:'Error', detail:'Un quiz no debe tener más de cuatro preguntas'});
  }
  }

  guardar(){
    this.dialogoGuardado = !this.dialogoGuardado;
  }  
  
  editarPregunta(){
    this.servicio.editarQuestion(this.ref,this.seleccionado.ref,this.editEnunciadoQuestion).subscribe({
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

  getPregunta(refQ:number){

    this.router.navigate(["/quizzes/"+this.ref+"/questions/"+refQ]);
  }

  noRespuestas(){
    this.messageService.add({key: 'noRespuestas', severity:'warn', summary: 'Error', detail: "No hay respuestas. Añada una"});
  }

  cargaRespuestas(question:Question){
    this.seleccionado = question;
    this.servicio.getRespuestas(this.ref,question.ref).subscribe((resp)=>{
      this.respuestas= resp;

  })
  this.dialogoRespCorrecta=!this.dialogoRespCorrecta
}

setRespuestaCorrecta(){
  this.servicio.setRespuestaCorrecta(this.ref,this.seleccionado.ref,this.selectResp).subscribe({
    next: (resp => {
      this.loadQuiz();
      this.dialogoRespCorrecta=!this.dialogoRespCorrecta
    }),
    error: resp=> {
      this.dialogoRespCorrecta=!this.dialogoRespCorrecta
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
    }
    })

}


}
