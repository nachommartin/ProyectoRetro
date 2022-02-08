import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
  
    return this.http.post(path, peticion);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}




obtenerToken(){
  return localStorage.getItem('token'); 
}

}
