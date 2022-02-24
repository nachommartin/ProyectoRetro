import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

  url : string= "";


  constructor(private http: HttpClient) { }

  votarJuego(ref:number, votacion:number, usuario:string){
    let ruta:string= "http://localhost:8080/juego/"+ref+"/votacion"; 

    const peticion = {
      'voto': votacion,
      'correo': usuario 
    }

    this.http.post(ruta,peticion)

  }

 
}
