import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Juego } from '../interfaces/juego';
import { BuscadorService } from '../services/buscador.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  cadena:string= ''; 
  opcionElegida:string='';
  sizeArray:number=0;


  options:any[] = [
    { name: "Año", id: "year" },
    { name: "Categoria", id: "categoria" },
    { name: "Desarrollador", id: "desarrollador" }
  ]



  constructor(private buscador:BuscadorService, private router: Router) { }

  ngOnInit(): void {
  }

  selectOption(opcion:string) {
    this.opcionElegida=opcion;
  }

//La carga de los datos se hace en el servicio y se recupera con este get
  get juegosObtenidos(){
    this.sizeArray=this.buscador.datosJuegos.length;
    return this.buscador.datosJuegos
    }

  //Método para filtrar por atributo
    buscarPorCategoria(x:any){
        this.cadena= x.target.value
        this.buscador.buscarAvanzado(this.opcionElegida, this.cadena); 
        this.router.navigateByUrl('/resultados');
    
    
    }

    getJuego(pk:any){
    
      this.router.navigate(["./juego/",pk]);
    }

}
