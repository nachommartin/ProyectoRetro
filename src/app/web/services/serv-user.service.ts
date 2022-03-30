import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServUserService {

  private url: string =  environment.baseUrl; ; 

  constructor(private http: HttpClient) { }

  actualizar(usuario:string){
  
    const path = `${this.url}usuario`;
    const peticion =usuario
    return this.http.put(path, peticion);
  
  }
}
