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
}
