import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardianService } from "./guardian/guardian.service";



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
  { path: '**', redirectTo: ''}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]})

export class AppRoutingModule { }
