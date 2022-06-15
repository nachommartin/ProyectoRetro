import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Question, Quiz, Respuesta } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url: string =  environment.baseUrl; ; 


  constructor(private http: HttpClient) { }

  getQuiz(ref:number){
    let path= this.url+"quiz/"+ref;
    return this.http.get<Quiz>(path)

  }

  guardarQuiz(nombre:string){
    let path= this.url+"quiz";
    const body={
      "name":nombre
    }
    return this.http.post<Quiz>(path, body)

  }

  editarQuiz(ref:number, nombre:string){
    let path= this.url+"quiz/"+ref;
    const body={
      "name":nombre
    }
    return this.http.put<Quiz>(path,body)

  }


  borrarQuiz(ref:number){
    let path= this.url+"quiz/"+ref;
  
    return this.http.delete<Quiz>(path)

  }
  getAllQuiz(){
    let path= this.url+"quiz";
    return this.http.get<Quiz[]>(path)
  }

  getPreguntas(ref:number){
    let path= this.url+"quiz/"+ref+"/preguntas";
    return this.http.get<Question[]>(path)

  }

  getPregunta(ref:number, refP:number){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP;
    return this.http.get<Question>(path)

  }

  guardarPregunta(ref:number, enunciado:string, orden:number){
    let path= this.url+"quiz/"+ref+"/preguntas";
    const body={
      "enunciadoPregunta":enunciado,
      "ordenPregunta":orden

    }
    return this.http.post<Question>(path, body)

  }

  editarQuestion(ref:number,refP:number, enunciado:string){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP;
    const body={
      "enunciadoPregunta":enunciado
    }
    return this.http.put(path,body)

  }

  setRespuestaCorrecta(ref:number,refP:number, resp:Respuesta){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP;
    const body={
      "respuestaCorrecta":resp
    }
    return this.http.put(path,body)

  }

  borrarPregunta(ref:number, refP:number){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP;
    return this.http.delete(path)
  }

  getRespuestas(ref:number, refP:number){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP+"/respuestas";
    return this.http.get<Respuesta[]>(path)

  }

  sumarPuntos(puntos:number){
    let path= this.url+"quiz/puntos";    
    let body={
      "puntos":puntos
    }
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}` || '' );
    return this.http.put(path,body, {headers})

  }

  guardarRespuesta(ref:number, refP:number, enunciado:string, orden:number){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP+"/respuestas" ;
    const body={
      "textoRespuesta":enunciado,
      "ordenRespuesta":orden

    }
    return this.http.post<Respuesta>(path, body)

  }

  editarRespuesta(ref:number,refP:number, refResp:number, texto:string){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP+"/respuestas/"+refResp;
    const body={
      "textoRespuesta":texto
    }
    return this.http.put(path,body)

  }

  borrarRespuesta(ref:number, refP:number, refResp:number){
    let path= this.url+"quiz/"+ref+"/preguntas/"+refP+"/respuestas/"+refResp;
    return this.http.delete(path)
  }

  
  proponer(mensaje:string, reportador:string){
    const path = `${this.url}enviar`;
    const peticion= {
      "subject":"Propuesta de pregunta",
      "text":reportador + " sugiere la siguiente pregunta " + mensaje
    }
    return this.http.post(path, peticion);


  }
}
