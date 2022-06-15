import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import Swal from 'sweetalert2';
import { Juego, Usuario, Votacion } from '../interfaces/juego';
import { VotacionService } from '../services/votacion.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {

  usuario!:Usuario;
  votos:Votacion[]=[]
  carga!:boolean;
  items:MenuItem[]=[]
  pages: number = 1;
  home!: MenuItem;
  dialogoEdit!:boolean
  seleccionado!:Votacion
  review!:string

  constructor(private servicioLogin:LoginService, private servicioVotos:VotacionService, private confirmService:ConfirmationService) { }

  ngOnInit(): void {
    this.datos()
    this.home = {icon: 'pi pi-home', routerLink: '/main'};

  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Mis Reseñas', routerLink:'/mis_reviews'},
    ];
    this.cargaVotos(resp.nick)
    }
    )
  }

  cargaVotos(nick:string){
  this.servicioVotos.obtenerVotacionesConReseñas(nick).
  subscribe((resp)=>{
    this.votos=resp; 
    this.carga=true
  })
}



//El símbolo menor que (<) me sale en rojo en el template como si estuviera deprecado y no me lo interpreta Angular, he tenido que desarrollar esta función
nota(voto:Votacion){
  let nota:string;
  if (voto.voto >4 && voto.voto<8){
    nota="REGULAR"
  }
  else if(voto.voto<4){
    nota="MALA"
  }
  else{
    nota="BUENA"
  }
  return nota; 
  }


styleCard = {'background-color': '#f7f7f5', 'width':'80%',  'margin-left': 'auto',
'margin-right': 'auto', 'display': 'block', 'margin-top':'0.625rem', 'margin-bottom':'0.625rem'}



borrar(voto:Votacion){
  this.servicioVotos.quitarReview(voto.codigo).subscribe({
    next: (resp => {
      Swal.fire(
        '', 'Has borrado la reseña', 'success'
      );
      this.datos()
    }),
  error: resp=> {
    Swal.fire(
      '¡Error!', resp.error.mensaje, 'error'
    );
  }
  })
}

confirmar(voto:Votacion) {
  this.confirmService.confirm({
      message: '¿Estás seguro que quieres eliminar esta reseña?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
          this.borrar(voto);
      },
      reject: () => {

      }
  });
}

seleccionarReviewEditar(voto:Votacion){
  this.dialogoEdit = !this.dialogoEdit;
  this.seleccionado = voto;
  this.review=this.seleccionado.review
}


editarReview(){
  this.servicioVotos.editarReview(this.seleccionado.codigo, this.review).subscribe({
    next: (resp => {
      Swal.fire(
        '', 'Has editado la reseña', 'success'
      );
      this.dialogoEdit = !this.dialogoEdit;
      this.datos()
  }),
  error: resp=> {
    Swal.fire(
      '¡Error!', resp.error.mensaje, 'error'
    );
  }
  })
}

obtenerImagen(juego:Juego){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
  const source = `data:image/png;base64,${base64String}`+juego.imagen;
  return source;
}


}
