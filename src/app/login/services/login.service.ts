import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://localhost:8000'; 


  constructor(private http: HttpClient) { }

  login(email:string, password:string)  {
    const path = `${this.url}/auth/login`;
    const peticion = {
      'email': email,
      'password': password 
    }
  
    return this.http.post(path, peticion);
  }
}
