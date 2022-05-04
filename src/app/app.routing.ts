import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanelComponent } from "./admin/panel/panel.component";
import { AdminGService } from "./guardian/admin-g.service";
import { GuardianService } from "./guardian/guardian.service";
import { RegistroComponent } from "./login/registro/registro.component";
import { DatosComponent } from "./not-register/datos/datos.component";
import { InicioComponent } from "./not-register/inicio/inicio.component";
import { ComunidadComponent } from "./web/comunidad/comunidad.component";
import { EditComponent } from "./web/edit/edit.component";
import { EnvioMensajeComponent } from "./web/envio-mensaje/envio-mensaje.component";
import { JuegoComponent } from "./web/juego/juego.component";
import { MensajeComponent } from "./web/mensaje/mensaje.component";
import { MySeguidoresComponent } from "./web/my-seguidores/my-seguidores.component";
import { PruebaComponent } from "./web/prueba/prueba.component";
import { ResultadosComponent } from "./web/resultados/resultados.component";
import { ReviewComponent } from "./web/review/review.component";
import { SiguiendoComponent } from "./web/siguiendo/siguiendo.component";
import { TablaJuegosComponent } from "./admin/tabla-juegos/tabla-juegos.component";
import { UsuarioComponent } from "./web/usuario/usuario.component";
import { VotosComponent } from "./web/votos/votos.component";



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
    path: 'comunidad', component: ComunidadComponent, 
    canActivate: [ GuardianService ]
   },

  {
    path: 'usuario', component: UsuarioComponent, 
    canActivate: [ GuardianService ]
   },

   {
    path: 'seguidores', component: MySeguidoresComponent, 
    canActivate: [ GuardianService ]
   },

   {
    path: 'siguiendo', component: SiguiendoComponent, 
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
    path:'mensaje/:receptor', component: EnvioMensajeComponent, 
    canActivate: [ GuardianService ]
  },
  {
    path:'votos/:stalkeado', component: VotosComponent, 
    canActivate: [ GuardianService ]
  },
  {
    path:'review/:titulo', component: ReviewComponent, 
    canActivate: [ GuardianService ]
  },
  {
    path:'mensajes', component: MensajeComponent, 
    canActivate: [ GuardianService ]
  },
  {
    path:'administracion', component: PanelComponent, 
    canActivate: [ AdminGService ]
  },
  {
    path: 'admin_game', component: TablaJuegosComponent,
    canActivate: [ AdminGService ]
   },
  
  {
    path: 'prueba', component: PruebaComponent
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
