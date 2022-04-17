import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGService implements CanActivate  {

  constructor(private servicioLogin: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       
    return this.servicioLogin.obtenerUsuarioPorToken().pipe(


        map( resp=>{
            let respuesta:boolean=false;
           if(resp.rol == "ADMIN"){

            respuesta = true;
           }
           else{
            Swal.fire('Error','No tienes acceso a esta página','error');
            this.router.navigateByUrl('/');

            respuesta=false;
           }


            return respuesta;
        }),
        catchError(error =>{
          Swal.fire('Error','No tienes acceso a esta página','error');
          
          this.router.navigateByUrl('/');
          return of(false)

            

        })
    )
    
}
}
