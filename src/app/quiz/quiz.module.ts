import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz/quiz.component';
import {TabViewModule} from 'primeng/tabview';
import { WebModule } from '../web/web.module';
import {CardModule} from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { QuizRoutingModule } from './quiz-routing';
import { SelectQuizComponent } from './select-quiz/select-quiz.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MenuModule} from 'primeng/menu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';







@NgModule({
  declarations: [
    QuizComponent,
    SelectQuizComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    QuizRoutingModule,
    WebModule,
    CardModule,
    ToastModule,
    DialogModule,
    NgxPaginationModule,
    MenuModule,
    BreadcrumbModule,
    FormsModule,
    ButtonModule
    
    
  ]
})
export class QuizModule { }
