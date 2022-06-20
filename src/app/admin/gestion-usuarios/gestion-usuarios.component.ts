import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Usuario } from 'src/app/web/interfaces/juego';
import { BuscadorService } from 'src/app/web/services/buscador.service';
import { AdminJuegoService } from '../services/admin-juego.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  usuarios:Usuario[]=[]
  selected!:Usuario;
  dialog!:boolean;
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;

  constructor(private servicioBusqueda: BuscadorService, private confirmationService:ConfirmationService, private servicioAdmin: AdminJuegoService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(){
    this.servicioBusqueda.getUsers().subscribe((resp)=>{
      this.usuarios= resp;
    } );
    
  }

  applyFilterGlobal($event: any, stringVal: any,  dt: any) {
    dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  
  

  getStatusBaneo(algo:any){

  }

  confirm(correo: string) {
    this.confirmationService.confirm({
        message: '¿Estás seguro que quieres eliminar este usuario?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        accept: () => {
            this.borrar(correo);
        },
        reject: () => {
  
        }
    });
  }

  borrar(nick:string){
    this.servicioAdmin.borrarUsuario(nick).subscribe({
      next: (resp => {
        this.obtenerUsuarios();

        }),
      error: resp=> {
  
        this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});

      }
      })
  
  }


  banear(usuario:Usuario){
    this.servicioAdmin.banear(usuario).subscribe({
      next:(resp=>{
        usuario.baneado=resp.baneado;
        usuario.fechaBaneo=resp.fechaBaneo
      }),
      error:(resp=>{
        this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
    
        })
    })
  }

  verBaneo(usuario:Usuario){
    this.selected=usuario;
    this.dialog=!this.dialog
    this.clock = this.source.subscribe(resp => {
      this.now = new Date();
      if(usuario.fechaBaneo!=null){     
      this.end = new Date (usuario.fechaBaneo.toString());
      this.showDate();
      }

    

  })
}

  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }

  noReloj(){
    this.messageService.add({key: 'noReloj', severity:'error', summary: 'Error', detail: "Este usuario no está baneado"});
  }

  
}
