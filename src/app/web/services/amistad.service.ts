import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Amistad, FollowCredentials } from '../interfaces/juego';

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


 
}
