import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';
import {TabViewModule} from 'primeng/tabview';
import { WebModule } from '../web/web.module';
import {CardModule} from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { QuizRoutingModule } from './quiz-routing';




@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    QuizRoutingModule,
    WebModule,
    CardModule,
    ToastModule,
    DialogModule
    
    
  ]
})
export class QuizModule { }
