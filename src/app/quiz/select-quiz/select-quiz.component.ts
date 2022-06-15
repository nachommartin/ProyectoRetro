import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Usuario } from 'src/app/web/interfaces/juego';
import Swal from 'sweetalert2';
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

  constructor(private servicio:QuizService, private router: Router, private servicioLogin:LoginService) { }

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
        Swal.fire(
          '', 'El administrador revisará tu propuesta', 'success'
        );
    }),
    error: resp=> {
      Swal.fire(
        '¡Error!', 'Ha habido un error inesperado', 'error'
      );
    }
    })
  }

  abrirPropuesta(){
    this.dialogo=!this.dialogo
  }

}
