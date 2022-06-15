import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { SelectQuizComponent } from './select-quiz/select-quiz.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: "", component: SelectQuizComponent, pathMatch: "full" },
            { path: ":ref", component: QuizComponent }
          ]
    }
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class QuizRoutingModule { }
