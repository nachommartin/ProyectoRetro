import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate( control: AbstractControl): Observable<ValidationErrors| null> {

    const email = control.value;
    return this.http.get<any>(`http://localhost:8080/register?correo=${ email }`)
                .pipe(
                  map ( resp => {
                    return ( resp.length === 0 ) 
                        ? null
                        : { emailTomado: true }
                  })
                );
  
  }
}
