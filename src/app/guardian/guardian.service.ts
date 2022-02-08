import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of, catchError } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate, CanActivateChild{

  constructor(private router:Router, private servicio: LoginService) { }


  canActivate( route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> | boolean | any{
    let access=false;
     
    return this.servicio.validarToken()
    .pipe(
        map( resp => {
          console.log(resp);
          
          return true
        }),
        catchError( err => {
            console.log(err);
            Swal.fire('Error',err.error.message,'error');
            
            this.router.navigateByUrl('/auth/login');
            return of(false)
        })
      )
      this.router.navigateByUrl
      return false
}

canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
  return this.canActivate(route,state);
}
}
