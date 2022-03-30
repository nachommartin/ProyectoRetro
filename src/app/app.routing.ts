import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardianService } from "./guardian/guardian.service";
import { RegistroComponent } from "./login/registro/registro.component";
import { DatosComponent } from "./not-register/datos/datos.component";
import { InicioComponent } from "./not-register/inicio/inicio.component";
import { EditComponent } from "./web/edit/edit.component";
import { JuegoComponent } from "./web/juego/juego.component";
import { NavbarComponent } from "./web/navbar/navbar.component";
import { ResultadosComponent } from "./web/resultados/resultados.component";
import { ReviewComponent } from "./web/review/review.component";
import { UsuarioComponent } from "./web/usuario/usuario.component";



const appRoutes: Routes = [
  {    
    path: '',component: InicioComponent
  },
  {    
    path: 'login',
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
    canActivate: [ GuardianService ]
    
  },
  {
    path: 'usuario', component: UsuarioComponent, 
    canActivate: [ GuardianService ]
   },

   {
    path: 'edit', component: EditComponent,
    canActivate: [ GuardianService ] 
   },

  {
    path: 'registro', component: RegistroComponent 
   },
  {
    path:'juego/:titulo', component: JuegoComponent, 
    canActivate: [ GuardianService ]
  },
  {
    path:'review/:titulo', component: ReviewComponent, 
    canActivate: [ GuardianService ]
  },
  {
    path: 'datos', component: DatosComponent 
   },
  { path: '**', redirectTo: ''}
];

// A excepción del Login, Registro, la Datatable y el inicio de la web, el Guardián evitará el acceso sin haberse autenticado 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]})

export class AppRoutingModule { }
