import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego } from 'src/app/web/interfaces/juego';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminJuegoService {

  private url: string =  environment.baseUrl; ; 

  constructor(private http: HttpClient) { }


  editar(juego:Juego, ref:number){
    
    const body={
      "titulo":juego.titulo,
      "plataforma":"Mega Drive",
      "year":juego.year,
      "desarrollador":juego.desarrollador,
      "categoria":juego.categoria
    }
  
    let path= this.url+"juego/"+ref;
    return this.http.put(path, body)
  }

  borrar(ref:number){
    
    let path= this.url+"juego/"+ref;
    return this.http.delete(path)
  }

  guardar(juego:Juego){
    
    const body={
      "titulo":juego.titulo,
      "plataforma":"Mega Drive",
      "year":juego.year,
      "desarrollador":juego.desarrollador,
      "categoria":juego.categoria
    }
  
    let path= this.url+"juego/";
    return this.http.post(path, body)
  }

}


