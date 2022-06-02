import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego, Usuario, Votacion } from 'src/app/web/interfaces/juego';
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

  getVoto(ref:number){
    let path= this.url+"votacion/"+ref;
    return this.http.get<Votacion>(path)

  }

  quitarReview(ref:number){
    let path= this.url+"votacion/"+ref;
    return this.http.delete(path)

  }

  editarReview(ref:number, review:string){
    let path= this.url+"votacion/"+ref;
    const peticion={
      "review":review
    }
    return this.http.put(path,peticion)

  }

  borrarUsuario(nick:string){
    let path= this.url+"usuario?nick="+nick;
    return this.http.delete(path)

  }

  banear(usuario:Usuario){
    let path= this.url+"usuario?baneo="+!usuario.baneado;
    const body={
      "correoSource":usuario.correo
    }
    return this.http.put<Usuario>(path,body)

  }

}


