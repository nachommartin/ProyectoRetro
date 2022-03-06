import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService implements AsyncValidator {

  constructor(private http: HttpClient) { }

//Método para comprobar si ya existe un usuario con ese correo en la base de datos de la aplicación
  validate( control: AbstractControl): Observable<ValidationErrors| null> {

    const email = control.value;
    return this.http.get<any>(`https://megadriver.herokuapp.com/register?correo=${ email }`)
                .pipe(
                  map ( resp => {
                    return ( resp.length === 0 ) 
                        ? null
                        : { emailTomado: true }
                  })
                );
  
  }
}