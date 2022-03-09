import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego } from 'src/app/web/interfaces/juego';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  private baseUrl: string = environment.baseUrl; 


  constructor(private http: HttpClient) { }

//Método para recuperar los datos para la Datatable
async datos() {
    
    return await this.http.get<Juego[]>(this.baseUrl+"juego");
  }
  
}
