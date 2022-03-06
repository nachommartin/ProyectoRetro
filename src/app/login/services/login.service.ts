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

//Método para login con el que conseguiremos desde el backend un token
  login(email:string, password:string)  {
    const path = `${this.url}/login/`;
    const peticion = {
      'correo': email,
      'password': password 
    }
  
    return this.http.post<Respuesta>(path, peticion);
  }

//Método para cerrar sesión y que se elimine nuestro token de autenticación
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}

//Método para registrar un usuario
registrar(usuario:string){
  
  const path = `${this.url}/register`;
  const peticion =usuario
  return this.http.post<Respuesta>(path, peticion);

}


//Método para obtener nuestro token del local storage que nos permitirá obtener el usuario mediante
//el mismo token
obtenerToken(){
  return localStorage.getItem('token'); 
}

//Método para validar el token, útil para que nuestro guardián impida el acceso a páginas si no estamos
//autenticados
validarToken():Observable<Respuesta>{
  const url = `${ this.url }/juego/`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );
  return this.http.get<Respuesta>( url, { headers } )
  

}

//Método para obtener nuestro usuario a través de la signature del token
obtenerUsuarioPorToken(){
  const url = `${ this.url }/usuario`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );
  return this.http.get<Usuario>(url, {headers});
}






}
