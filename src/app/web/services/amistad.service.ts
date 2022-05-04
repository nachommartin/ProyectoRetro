import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Amistad, Comentario, FollowCredentials, Usuario, Votacion } from '../interfaces/juego';

@Injectable({
  providedIn: 'root'
})
export class AmistadService {

  private baseUrl: string = environment.baseUrl; 


  constructor(private http: HttpClient) { }

  followUsuario(aSeguir:string, follower:string){
    let ruta:string= this.baseUrl+"amistad/"; 

    const peticion = {
      'correoTarget': aSeguir,
      'correoAskToFollow': follower 
    }

    return this.http.post(ruta,peticion)

  }

  unfollowUsuario(aSeguir:string, follower:string){
    let ruta:string= this.baseUrl+"amistad/"; 
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        'correoTarget': aSeguir,
        'correoAskToFollow': follower 
      },
    };
    


    return this.http.delete(ruta,options)

  }

  getFollowers(correo:string){
    let ruta:string= this.baseUrl+"usuario/amistad?correoSource="+correo; 
    return this.http.get<FollowCredentials[]>(ruta)  



  }

  getSeguidos(correo:string){
    let ruta:string= this.baseUrl+"usuario/amistad/seguidos?correoSource="+correo; 
    return this.http.get<Amistad[]>(ruta)  



  }


  verVotos(stalker:string,stalkeado:string){

    let ruta:string= this.baseUrl+"votacion"; 

    
    const peticion = {
      "correoAskToFollow": stalker,
	    "correoTarget": stalkeado
    }

    return this.http.post<Votacion[]>(ruta,peticion)

  
  }

  obtenerUsuario(query:string){
    let ruta:string= this.baseUrl+"token?nick="; 

    return this.http.get<Usuario>(ruta+query+"")

  }

  mandarMensaje(emisor:string,receptor:string,mensaje:string){

    let ruta:string= this.baseUrl+"comentario"; 

    const peticion = {
      "correoEmisor": emisor,
	    "receptor": receptor,
      "texto":mensaje
    }

    return this.http.post(ruta,peticion)


  }

  cargarMensajes(query:string){
    let ruta:string= this.baseUrl+"comentario?nick="; 
    return this.http.get<Comentario[]>(ruta+query)

  }

  borrarMensaje(id:number, receptor:string){
    let ruta:string= this.baseUrl+"comentario/"+id; 
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        'receptor': receptor,
      },
    };
    
    return this.http.delete(ruta, options)
  }


 
}
