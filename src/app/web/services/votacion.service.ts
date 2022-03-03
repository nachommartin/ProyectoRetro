import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Votacion } from '../interfaces/juego';

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

    return this.http.post(ruta,peticion)

  }

  obtenerVotacionesUsuario(usuario:string){
    let ruta:string= "http://localhost:8080/usuario/"+usuario+"/votacion"; 
    return this.http.get<Votacion[]>(ruta);


  }

  incluirReview(ref:number,review:string, usuario:string){
    let ruta:string= "http://localhost:8080/juego/"+ref+"/votacion"; 

    const peticion = {
      'review': review,
      'correo': usuario 
    }

    return this.http.put(ruta,peticion)


  }

  obtenerVotacionesJuego(ref:number){
    let ruta:string= "http://localhost:8080/juego/"+ref+"/votacion"; 
    return this.http.get<Votacion[]>(ruta);


  }
 
}
