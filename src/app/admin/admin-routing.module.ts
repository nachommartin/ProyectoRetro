import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';


let routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: PanelComponent },
          ]
    }
    
  ];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
    exports: [RouterModule]
  
})
export class AdminRoutingModule { }
