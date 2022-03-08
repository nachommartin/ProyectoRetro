import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService implements AsyncValidator {

  private baseUrl: string = environment.baseUrl; 

  constructor(private http: HttpClient) { }

//Método para comprobar si ya existe un usuario con ese correo en la base de datos de la aplicación
  validate( control: AbstractControl): Observable<ValidationErrors| null> {

    const email = control.value;
    return this.http.get<any>(this.baseUrl+`register?correo=${ email }`)
                .pipe(
                  map ( resp => {
                    return ( resp.length === 0 ) 
                        ? null
                        : { emailTomado: true }
                  })
                );
  
  }
}
