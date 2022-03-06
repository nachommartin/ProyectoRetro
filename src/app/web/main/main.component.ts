import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  textoPadre!: string; 
  val:any; 

  constructor(private servicio: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  recibirOpcion(mensaje:string){
    this.textoPadre= mensaje;
  }

  checkToken(){
    this.servicio.validarToken()
    .subscribe({
      next: () => console.log('Token válido'),
      error: resp => {
        this.router.navigateByUrl('/login')
        
      } 
    }
    )

}
  
itemSelected(e:any){
  this.val = e;
};


  }