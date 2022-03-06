import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  val:any; 

  constructor(private servicio: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

//Captura del evento del elemento hijo y guardado de la información traspasada en una variable
itemSelected(e:any){
  this.val = e;
};


  }