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

  reportar(ref:number, mensaje:string){
    const path = `${this.url}enviar`;
    const peticion= {
      "subject":"revisa "+mensaje,
      "text":mensaje+" con referencia "+ref
    }
    return this.http.post(path, peticion);


  }
}
