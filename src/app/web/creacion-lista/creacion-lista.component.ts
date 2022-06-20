import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/services/login.service';
import { Usuario } from '../interfaces/juego';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-creacion-lista',
  templateUrl: './creacion-lista.component.html',
  styleUrls: ['./creacion-lista.component.css']
})
export class CreacionListaComponent implements OnInit {

  usuario!:Usuario;
  carga:boolean=false;
  public formGroup!: FormGroup;
  home!:MenuItem;
  items:MenuItem[]=[]



  constructor(private servicioLogin:LoginService, private formBuilder: FormBuilder,
    private servicioUser:ServUserService, private router: Router, private messageService:MessageService) { }

  ngOnInit(): void {

    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true;
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Mis listas', routerLink:'/listas'},
        {label: 'Creación de lista', routerLink:'/crear_lista'},
    ];
    }
    )
    this.home = {icon: 'pi pi-home', routerLink: '/main'};
    this.buildForm();

  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      nombre: [, Validators.required],
      publico: [, Validators.required],
    },        
  )
  
  }

  campoNoValido( campo: string ) {
    return this.formGroup.get(campo)?.invalid
            && this.formGroup.get(campo)?.touched;
  }

crear(){

  const auxLista = this.formGroup.value;

  this.servicioUser.crearLista(this.usuario.correo, auxLista.publico, auxLista.nombre).subscribe({
    next: (resp => {
      this.messageService.add({key: 'irAnadir', severity:'success', detail:'Ahora añade tus juegos'});

      
      this.servicioUser.cargarListas(this.usuario.nick).subscribe((resp)=>{
        const size=resp.length;
        const referencia=resp[size-1].referencia 
        this.router.navigateByUrl('/lista/'+referencia);
      }
      )
  }),
  error: resp=> {
    this.messageService.add({key: 'error', severity:'error', summary:'Error', detail:'Hubo un error inesperado'});
  }
  })

}

obtenerImagen(usuario:Usuario){
  const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
  const source = `data:image/png;base64,${base64String}`+usuario.avatar;
  return source;
}

}
