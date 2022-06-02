import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Juego, Listado } from '../interfaces/juego';

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

  reportar(ref:number, mensaje:string, reportador:string){
    const path = `${this.url}enviar`;
    const peticion= {
      "subject":"revisa "+mensaje,
      "text":reportador + " quiere que revises la " + mensaje+" con referencia "+ref
    }
    return this.http.post(path, peticion);


  }

  cargarListas(nick: string){
    const path = `${this.url}usuario/`+nick+"/listado";
    return this.http.get<Listado[]>(path);

  }

  crearLista(correo:string,publico:boolean,nombre:string){
    const path = `${this.url}listado`;
    const peticion= {
      "correo":correo,
      "publico":publico,
      "nombre":nombre
    }
    return this.http.post(path, peticion);

  }

  getListado(nick:string, ref:number){
    const path = `${this.url}usuario/`+nick+"/listado/"+ref;
    return this.http.get<Listado>(path);
  }

  getJuegosListado(nick:string, ref:number){
    const path = `${this.url}usuario/`+nick+"/listado/"+ref+"/juego";
    return this.http.get<Juego[]>(path);
  }

  addJuegoLista(correo:string,refJuego:number,codigo:number){
    const path = `${this.url}listado/`+codigo;
    const peticion= {
      "correo":correo,
      "refJuego":refJuego,
    }
    return this.http.put(path, peticion);

  }

  borrarListado(nick:string, ref:number){
    const path = `${this.url}usuario/`+nick+"/listado/"+ref;
    return this.http.delete<Listado>(path);
  }
}
