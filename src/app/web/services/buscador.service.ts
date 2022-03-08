import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Juego } from '../interfaces/juego';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  baseUrl: string = environment.baseUrl; 
  url:string=""
  datosJuegos: Juego[]=[];

  constructor(private http: HttpClient) { }

  //Método para buscar un juego por una cadena de texto que coincida con una parte del título 
  buscarJuego(query:String){
    this.url= this.baseUrl+"juego?titulo="+query+"";
    this.getJuegos();      
  }

  //Método para una búsqueda filtrada por los atributos de la entidad Juego
  buscarAvanzado(cat:String, query:String){
    this.url= this.baseUrl+"juego?"+cat+"="+query+"";
    this.getJuegos();      
  }

  //Método para obtener los juegos y guardarlos en una variable del servidor
  getJuegos() {
    this.http.get<Juego[]>(this.url)
    .subscribe((resp)=>{
      this.datosJuegos= resp;
    }
  );
  }

  //Método para obtener un juego por su título
  obtenerJuego(query:string){
    let ruta:string= this.baseUrl+"juego?titulo="; 

    return this.http.get<Juego[]>(ruta+query+"")

  }

}