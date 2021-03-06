import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Usuario } from 'src/app/web/interfaces/juego';
import { Quiz } from '../interfaces/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-select-quiz',
  templateUrl: './select-quiz.component.html',
  styleUrls: ['./select-quiz.component.css']
})
export class SelectQuizComponent implements OnInit {

  quizzes:Quiz[]=[]
  carga!:boolean;
  items:MenuItem[]=[]
  pages: number = 1;
  home!: MenuItem;
  propuesta!:string;
  usuario!:Usuario; 
  dialogo!:boolean;

  constructor(private servicio:QuizService, private router: Router, private servicioLogin:LoginService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.datos()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};
  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
    }
    )
    this.servicio.getAllQuiz().subscribe((resp) => {
      this.quizzes = resp;
      this.carga =true;
      this.items = [
        {label: 'Quiz MegaDriver', routerLink:'/quiz'},
    ];
    });
  }

  getQuiz(ref:number){
    this.router.navigate(["./quiz/",ref])    

  }

  proponer(){

    this.servicio.proponer(this.propuesta, this.usuario.nick).subscribe({
      next: (resp => {
        this.abrirPropuesta()
        this.messageService.add({key: 'send', severity:'success', detail:'El administrador revisará tu propuesta'});

    }),
    error: resp=> {
      this.messageService.add({key: 'errorSend', severity:'error', summary:'Error', detail:'Ha habido un error inesperado'});
    }
    })
  }

  abrirPropuesta(){
    this.dialogo=!this.dialogo
  }

}
