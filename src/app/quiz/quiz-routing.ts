import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardianService } from 'src/app/guardian/guardian.service';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
    {
        path: '',
        component: QuizComponent,
        canActivate:[GuardianService]
    }
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class QuizRoutingModule { }
