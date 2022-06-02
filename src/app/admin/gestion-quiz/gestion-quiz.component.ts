import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Quiz } from 'src/app/quiz/interfaces/quiz';
import { QuizService } from 'src/app/quiz/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-quiz',
  templateUrl: './gestion-quiz.component.html',
  styleUrls: ['./gestion-quiz.component.css']
})
export class GestionQuizComponent implements OnInit {

  quizzes:Quiz[]=[]
  seleccionado!:Quiz
  dialogoGuardado!:boolean
  nombreQuiz!:string
  editNombreQuiz!:string
  dialogoEdit!:boolean

  constructor(private servicio:QuizService, private confirmationService:ConfirmationService ) { }

  ngOnInit(): void {
    this.datos();
  }


  datos(){
    this.servicio.getAllQuiz().subscribe((resp) => {
      this.quizzes = resp;
    });
  }

  


  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.quizzes.length; i++) {
        if (this.quizzes[i].ref === id) {
            index = i;
            break;
        }
    }

    return index;
}

  applyFilterGlobal($event: any, stringVal: any,  dt: any) {
  dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
}


confirmar(idQuiz: number) {
  this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar el juego?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
          this.borrarQuiz(idQuiz);
      },
      reject: () => {

      }
  });
}

seleccionarQuizEditar(quiz:Quiz){
  this.mostrarFormulario();
  this.seleccionado = quiz;
}

addQuiz(){
this.servicio.guardarQuiz(this.nombreQuiz).subscribe({
next: (resp => {
  this.datos();
  }),
error: resp=> {
  Swal.fire(
    '¡Error!', resp.error.mensaje, 'error'
    );
}
})
}


guardar(){
  this.dialogoGuardado = !this.dialogoGuardado;
}  

editar(){
  this.servicio.editarQuiz(this.seleccionado.ref,this.editNombreQuiz).subscribe({
  next: (resp => {
    this.datos();
    }),
  error: resp=> {
    Swal.fire(
      '¡Error!', resp.error.mensaje, 'error'
      );
  }
  })
}

borrarQuiz(ref:number){
  this.servicio.borrarQuiz(ref).subscribe({
    next: (resp => {
      this.datos();
      }),
    error: resp=> {
      Swal.fire(
        '¡Error!', resp.error.mensaje, 'error'
        );
    }
    })
  
}

mostrarFormulario() {
  this.dialogoEdit = !this.dialogoEdit;
}


}
