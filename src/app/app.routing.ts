import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardianService } from "./guardian/guardian.service";
import { JuegoComponent } from "./web/juego/juego.component";
import { NavbarComponent } from "./web/navbar/navbar.component";
import { ResultadosComponent } from "./web/resultados/resultados.component";



const appRoutes: Routes = [
  {    
    path: '',
    loadChildren: () => import('./login/login.module')
    .then(m => m.LoginModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./web/web.module').then( m => m.WebModule),
    canActivate: [ GuardianService ]
  },
  {
    path: 'resultados', component: ResultadosComponent,
    
  },

  {
    path: 'juego', component: JuegoComponent 
   },
  {
    path:'juego/:titulo', component: JuegoComponent},
  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]})

export class AppRoutingModule { }
