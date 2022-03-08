import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Votacion } from '../interfaces/juego';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

  private baseUrl: string = environment.baseUrl; 


  constructor(private http: HttpClient) { }

  //Método para votar un juego
  votarJuego(ref:number, votacion:number, usuario:string){
    let ruta:string= this.baseUrl+"juego/"+ref+"/votacion"; 

    const peticion = {
      'voto': votacion,
      'correo': usuario 
    }

    return this.http.post(ruta,peticion)

  }

  //Método para obteneres las votaciones de un usuario
  obtenerVotacionesUsuario(usuario:string){
    let ruta:string= this.baseUrl+"votacion"; 
    
    const peticion = {
      'correoTarget': usuario 
    }
    
    return this.http.post<Votacion[]>(ruta,peticion);


  }

  //Método para añadir una reseña
  incluirReview(ref:number,review:string, usuario:string){
    let ruta:string= this.baseUrl+"juego/"+ref+"/votacion"; 

    const peticion = {
      'review': review,
      'correo': usuario 
    }

    return this.http.put(ruta,peticion)


  }

//Método para obtener todas las votaciones de un juego
  obtenerVotacionesJuego(ref:number){
    let ruta:string= this.baseUrl+"juego/"+ref+"/votacion"; 
    return this.http.get<Votacion[]>(ruta);


  }

  //Método para obtener todas las reseñas de un juego
  obtenerReviewsJuego(ref:number){
    let ruta:string= this.baseUrl+"juego/"+ref+"/votacion/review"; 
    return this.http.get<Votacion[]>(ruta);


  }
 
}
