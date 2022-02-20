import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego } from '../interfaces/juego';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  url : string= "";
  datosJuegos: Juego[]=[];

  constructor(private http: HttpClient) { }

  buscarJuego(query:String){
    this.url= "http://localhost:8080/juego?titulo="+query+"";
    this.getJuegos();      
  }

  getJuegos() {
    this.http.get<Juego[]>(this.url)
    .subscribe((resp)=>{
      this.datosJuegos= resp;
    }
  );
  }


}