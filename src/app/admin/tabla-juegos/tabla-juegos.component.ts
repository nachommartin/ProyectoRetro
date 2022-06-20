import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DatatableService } from 'src/app/not-register/services/datatable.service';
import { CargaDatosService } from 'src/app/web/services/carga-datos.service';
import { Juego } from '../../web/interfaces/juego';
import { AdminJuegoService } from '../services/admin-juego.service';

@Component({
  selector: 'app-tabla-juegos',
  templateUrl: './tabla-juegos.component.html',
  styleUrls: ['./tabla-juegos.component.css'],
  providers: [MessageService,ConfirmationService]
})

export class TablaJuegosComponent implements OnInit {
  juegos:Juego[]=[];
  seleccionado!: Juego;
  selectToAddImagen!:Juego
  juego!:Juego;
  dialogo!:boolean;
  dialogoImagen!:boolean
  dialogoGuardado!:boolean;
  formGroup!: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;





  constructor(private servicio:DatatableService, private confirmationService: ConfirmationService,
    private cargador:CargaDatosService, private formBuilder: FormBuilder, private servicioAdmin:AdminJuegoService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.datos();
    this.buildForm();
    
  }

  datos(){
    this.servicio.datos().subscribe((resp) => {
      this.juegos = resp;
    });
  }

  addJuego(){
    const juego =(this.formGroup.value);
  this.servicioAdmin.guardar(juego).subscribe({
  next: (resp => {
    this.datos();
    this.buildForm();  
    this.guardar()  
    }),
  error: resp=> {
    this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});

  }
  })
  }


  guardar(){
    this.dialogoGuardado = !this.dialogoGuardado;
  }  



  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.juegos.length; i++) {
        if (this.juegos[i].referencia === id) {
            index = i;
            break;
        }
    }

    return index;
}

  applyFilterGlobal($event: any, stringVal: any,  dt: any) {
  dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
}


confirmar(idJuego: number) {
  this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar el juego?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
          this.borrarJuego(idJuego);
      },
      reject: () => {

      }
  });
}

obtenerImagen(juego:Juego){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(juego.imagen)));
  const source = `data:image/png;base64,${base64String}`+juego.imagen;
  return source;
}

seleccionarJuegoEditar(juego:Juego){
  this.mostrarFormulario();
  this.seleccionado = juego;
}

seleccionarAddImagen(juego:Juego){
  this.cargarImagen();
  this.selectToAddImagen = juego;
}

mostrarFormulario() {
  this.dialogo = !this.dialogo;
}

cargarImagen() {
  this.dialogoImagen = !this.dialogoImagen;
}


buildForm(){
  this.formGroup = this.formBuilder.group({
    titulo: [],
    year: [],
    desarrollador: [],
    categoria: [],
  }       
)
}

editar(){
  const juego =(this.formGroup.value);
  this.servicioAdmin.editar(juego, this.seleccionado.referencia).subscribe({
  next: (resp => {
    this.datos();
    this.buildForm();   
    this.mostrarFormulario(); 
    }),
  error: resp=> {
    this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
  }
  })
}

borrarJuego(id:number){
  this.servicioAdmin.borrar(id).subscribe({
    next: (resp => {
      this.datos();
      this.buildForm();    
      }),
    error: resp=> {
      this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:resp.error.mensaje});
    }
    })
  
}

selectFile(event: any): void {
  this.selectedFiles = event.target.files;
}

upload(): void {
  this.progress = 0;
  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentFile = file;
      this.cargador.upload(this.currentFile,this.selectToAddImagen.referencia).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total)   
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
          this.datos()
          this.buildForm(); 
        },
        error: (err: any) => {
          this.progress = 0;
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'No se ha podido subir el archivo';
          }
          this.currentFile = undefined;
        }
      });
    }
    this.selectedFiles = undefined;
  }
}





}
