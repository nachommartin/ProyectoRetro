import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of, catchError } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate, CanActivateChild{

  // Guardián para controlar el acceso con token validado
  constructor(private router:Router, private servicio: LoginService) { }


  canActivate( route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | boolean | any{
    let access=false;
     
    return this.servicio.validarToken()
    .pipe(
        map( resp => {
          
          return true
        }),
        catchError( err => {
            Swal.fire('Error','No tienes acceso a esta página','error');
            
            this.router.navigateByUrl('/');
            return of(false)
        })
      )
      
}

canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
  return this.canActivate(route,state);
}
}
