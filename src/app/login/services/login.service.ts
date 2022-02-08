import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Respuesta } from 'src/app/interfaces/respuestas';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://localhost:8000'; 




  constructor(private http: HttpClient, private router: Router) { }

  login(email:string, password:string)  {
    const path = `${this.url}/auth/login`;
    const peticion = {
      'email': email,
      'password': password 
    }
  
    return this.http.post<Respuesta>(path, peticion);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}




obtenerToken(){
  return localStorage.getItem('token'); 
}

validarToken():Observable<Respuesta>{
  const url = `${ this.url }/games`;
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );

  return this.http.get<Respuesta>( url, { headers } )
  

}

}
