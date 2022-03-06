import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego } from 'src/app/web/interfaces/juego';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor(private http: HttpClient) { }

//Método para recuperar los datos para la Datatable
  datos() {
    return this.http.get<Juego[]>('http://localhost:8080/juego');
  }
  
}
