import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargaDatosService {

  private baseUrl: string =  environment.baseUrl; ; 


  constructor(private http: HttpClient) { }

  upload(file: File, ref:number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const peticion = new HttpRequest('POST', `${this.baseUrl}carga?ref=`+ref, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(peticion);
  }
}
