import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/interfaces/respuestas';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/web/interfaces/juego'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  private url: string = 'http://localhost:8080'; 




  constructor(private http: HttpClient, private router: Router) { }

  login(email:string, password:string)  {
    const path = `${this.url}/login/`;
    const peticion = {
      'correo': email,
      'password': password 
    }
  
    return this.http.post<Respuesta>(path, peticion);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}

registrar(usuario:string){
  
  const path = `${this.url}/register`;
  const peticion =usuario
  return this.http.post<Respuesta>(path, peticion);

}



obtenerToken(){
  return localStorage.getItem('token'); 
}

validarToken():Observable<Respuesta>{
  const url = `${ this.url }/juego/`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );
  return this.http.get<Respuesta>( url, { headers } )
  

}


obtenerUsuarioPorToken(){
  const url = `${ this.url }/usuario`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );
  return this.http.get<Usuario>(url, {headers});
}






}
