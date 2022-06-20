import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
import { ResultadosComponent } from "./web/resultados/resultados.component";
import { ReviewComponent } from "./web/review/review.component";
import { SiguiendoComponent } from "./web/siguiendo/siguiendo.component";
import { UsuarioComponent } from "./web/usuario/usuario.component";
import { VotosComponent } from "./web/votos/votos.component";
import { MisListasComponent } from "./web/mis-listas/mis-listas.component";
import { CreacionListaComponent } from "./web/creacion-lista/creacion-lista.component";
import { ListaComponent } from "./web/lista/lista.component";
import { ListaUsuarioComponent } from "./web/lista-usuario/lista-usuario.component";
import { MasVotadosComponent } from "./web/mas-votados/mas-votados.component";
import { MejorMediaComponent } from "./web/mejor-media/mejor-media.component";
import { NotbangService } from "./guardian/notbang.service";
import { MyVotosComponent } from "./web/my-votos/my-votos.component";
import { MyReviewsComponent } from "./web/my-reviews/my-reviews.component";
import { QuestionComponent } from "./admin/question/question.component";
import { QuizzComponent } from "./admin/quizz/quizz.component";
import { GestionQuizComponent } from "./admin/gestion-quiz/gestion-quiz.component";
import { GestionUsuariosComponent } from "./admin/gestion-usuarios/gestion-usuarios.component";
import { GestionReviewComponent } from "./admin/gestion-review/gestion-review.component";
import { GestionMensajeComponent } from "./admin/gestion-mensaje/gestion-mensaje.component";
import { TablaJuegosComponent } from "./admin/tabla-juegos/tabla-juegos.component";
import { PanelComponent } from "./admin/panel/panel.component";



const appRoutes: Routes = [
  {    
    path: '',component: InicioComponent
  },
  {    
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule),
    canActivate: [ AdminGService ]
  },
  {    
    path: 'login',
    loadChildren: () => import('./login/login.module')
    .then(m => m.LoginModule)
  },
  {    
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module')
    .then(m => m.QuizModule),
    canActivate: [ GuardianService, NotbangService ]
  },
  {
    path: 'main',
    loadChildren: () => import('./web/web.module').then( m => m.WebModule),
    canActivate: [ GuardianService, NotbangService ]
  },
  {
    path: 'resultados', component: ResultadosComponent,
    canActivate: [ GuardianService, NotbangService ]
    
  },
  {
    path: 'comunidad', component: ComunidadComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },

   {
    path: 'mas_votados', component: MasVotadosComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },

   {
    path: 'mejor_valorados', component: MejorMediaComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },

  {
    path: 'usuario', component: UsuarioComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },
   
   {
    path: 'mis_votos', component: MyVotosComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },

   {
    path: 'mis_reviews', component: MyReviewsComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },


   {
    path: 'seguidores', component: MySeguidoresComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },

   {
    path: 'siguiendo', component: SiguiendoComponent, 
    canActivate: [ GuardianService,NotbangService ]
   },

   {
    path: 'listas', component: MisListasComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },

   {
    path: 'listas/:usuario', component: ListaUsuarioComponent, 
    canActivate: [ GuardianService, NotbangService]
   },

   {
    path: 'crear_lista', component: CreacionListaComponent, 
    canActivate: [ GuardianService, NotbangService ]
   },

   {
    path:'lista/:referencia', component: ListaComponent, 
    canActivate: [ GuardianService, NotbangService ]
  },

   {
    path: 'edit', component: EditComponent,
    canActivate: [ GuardianService, NotbangService ] 
   },

  {
    path: 'registro', component: RegistroComponent 
   },
  {
    path:'juego/:titulo', component: JuegoComponent, 
    canActivate: [ GuardianService, NotbangService ]
  },
  {
    path:'mensaje/:receptor', component: EnvioMensajeComponent, 
    canActivate: [ GuardianService, NotbangService ]
  },
  {
    path:'votos/:stalkeado', component: VotosComponent, 
    canActivate: [ GuardianService, NotbangService ]
  },
  {
    path:'review/:titulo', component: ReviewComponent, 
    canActivate: [ GuardianService, NotbangService]
  },
  {
    path:'mensajes', component: MensajeComponent, 
    canActivate: [ GuardianService, NotbangService ]
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
   path: 'admin_comment', component: GestionMensajeComponent,
   canActivate: [ AdminGService ]
  },
  {
    path: 'admin_review', component: GestionReviewComponent,
    canActivate: [ AdminGService ]
   },
   {
    path: 'admin_users', component: GestionUsuariosComponent,
    canActivate: [ AdminGService ]
   },
   {
    path: 'admin_quizz', component: GestionQuizComponent,
    canActivate: [ AdminGService ]
   },

   {
    path:'quizzes/:ref', component: QuizzComponent, 
    canActivate: [ AdminGService]
  },
  {
    path:'quizzes/:ref/questions/:refQ', component: QuestionComponent, 
    canActivate: [ AdminGService]
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
