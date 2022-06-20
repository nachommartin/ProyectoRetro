import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/services/login.service';
import { NickService } from 'src/app/login/services/nick.service';
import { Usuario } from '../interfaces/juego';
import { CargaDatosService } from '../services/carga-datos.service';
import { ServUserService } from '../services/serv-user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  usuario!: Usuario; 
  public formGroup!: FormGroup;
  public passwordPattern  : string= "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$";
  opcionElegida:string='';
  carga: boolean= false; 
  dialogoAvatar!:boolean;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  
  items: MenuItem[]=[];
  home!: MenuItem;

  


  options:any[] = [
    { name: "Álava", id: "Alava" },
    { name: "Albacete", id: "Albacete" },
    { name: "Alicante", id: "Alicante" },
    { name: "Almería", id: "Almeria" },
    { name: "Asturias", id: "Asturias" },
    { name: "Ávila", id: "Avila" },
    { name: "Badajoz", id: "Badajoz" },
    { name: "Baleares", id: "Baleares" },
    { name: "Barcelona", id: "Barcelona" },
    { name: "Burgos", id: "Burgos" },
    { name: "Cáceres", id: "Caceres" },
    { name: "Cádiz", id: "Cadiz" },
    { name: "Cantabria", id: "Cantabria" },
    { name: "Castellón", id: "Castellon" },
    { name: "Ceuta", id: "Ceuta" },
    { name: "Ciudad Real", id: "Ciudad Real" },
    { name: "Córdoba", id: "Cordoba" },
    { name: "Coruña, La", id: "Corunha" },
    { name: "Cuenca", id: "Cuenca" },
    { name: "Gerona", id: "Gerona" },
    { name: "Granada", id: "Granada" },
    { name: "Guadalajara", id: "Guadalajara" },
    { name: "Guipúzcoa", id: "Guipuzcoa" },
    { name: "Huelva", id: "Huelva" },
    { name: "Huesca", id: "Huesca" },
    { name: "Jaén", id: "Jaen" },
    { name: "Las Palmas de Gran Canaria", id: "Las Palmas" },
    { name: "León", id: "Leon" },
    { name: "Lérida", id: "Lerida" },
    { name: "Lugo", id: "Lugo" },
    { name: "Madrid", id: "Madrid" },
    { name: "Málaga", id: "Malaga" },
    { name: "Melilla", id: "Melilla" },
    { name: "Murcia", id: "Murcia" },
    { name: "Navarra", id: "Navarra" },
    { name: "Orense", id: "Orense" },
    { name: "Palencia", id: "Palencia" },
    { name: "Pontevedra", id: "Pontevedra" },
    { name: "Rioja, La", id: "Rioja" },
    { name: "Salamanca", id: "Salamanca" },
    { name: "Santa Cruz de Tenerife", id: "Tenerife" },
    { name: "Segovia", id: "Segovia" },
    { name: "Sevilla", id: "Sevilla" },
    { name: "Soria", id: "Soria" },
    { name: "Tarragona", id: "Tarragona" },
    { name: "Teruel", id: "Teruel" },
    { name: "Toledo", id: "Toledo" },
    { name: "Valencia", id: "Valencia" },
    { name: "Valladolid", id: "Valladolid" },
    { name: "Vizcaya", id: "Vizcaya" },
    { name: "Zamora", id: "Zamora" },
    { name: "Zaragoza", id: "Zaragoza" }
  ]

  constructor(private servicioLogin: LoginService, private formBuilder: FormBuilder, private validadorNick: NickService,
    private router: Router, private userService:ServUserService, private cargador: CargaDatosService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.datos()
    this.buildForm();
    this.home = {icon: 'pi pi-home', routerLink: '/main'};

  }

  datos(){
    this.servicioLogin.obtenerUsuarioPorToken().
    subscribe((resp)=>{
      this.usuario=resp; 
      this.carga=true
      this.items = [
        {label: resp.nick, routerLink:'/usuario'},
        {label: 'Edición', routerLink:'/edit'},
    ];
    }
    )
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      correoSource:[],
      nick: [,  [Validators.required], [this.validadorNick]],
      ciudad: [],
      password: [, [Validators.minLength(6), Validators.pattern(this.passwordPattern)] ],
      repitePass: [ ]
    },     
    {validators: [ this.camposIguales('password','repitePass') ]
  }    
  )
  
  }

  
  selectOption(opcion:string) {
    this.opcionElegida=opcion;
  }

  public actualizar() {

    const errors = this.formGroup.get('nick')?.errors!;
    if (this.formGroup.controls['nick'].errors!=null && errors['nickTomado']) {
      this.messageService.add({key: 'nickError', severity:'error', summary:'Error', detail:'No insistas, ese nick está en uso'});
      
    }

    else if(this.formGroup.controls['password'].value!=null && this.formGroup.controls['repitePass'].value==null){
          this.messageService.add({key: 'faltaCampo', severity:'error', summary:'Error', detail:'Para cambiar la contraseña, rellena los dos campos'});
      
    }

    else if(this.formGroup.controls['password'].value==null && this.formGroup.controls['repitePass'].value!=null){
      this.messageService.add({key: 'faltaCampo', severity:'error', summary:'Error', detail:'Para cambiar la contraseña, rellena los dos campos'});
      
    }

    else if(this.formGroup.controls['repitePass'].errors!=null){
      this.messageService.add({key: 'debeCoincidir', severity:'error', summary:'Error', detail:'Fíjate bien, las contraseñas deben ser iguales'});
      
    }


    else{

    this.formGroup.patchValue({
      correoSource:this.usuario.correo
    })
    
    const user = JSON.stringify(this.formGroup.value);
    this.userService.actualizar(JSON.parse(user)).subscribe({
    next: (resp => {
      this.messageService.add({key: 'editCorrect', severity:'success', detail:'Se ha editado tu perfil'});
      this.router.navigateByUrl('/usuario');
  }),
  error: resp=> {
    this.messageService.add({key: 'errorEdit', severity:'error', summary:'Error', detail:resp.error.mensaje});
  }
  })
}
}

  camposIguales( campo1: string, campo2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 



      formGroup.get(campo2)?.setErrors(null);

      return null
    }

  }

  campoNoValido( campo: string ) {
    return this.formGroup.get(campo)?.invalid
            && this.formGroup.get(campo)?.touched;
  }

  get nickErrorMsg(): string {
    
    const errors = this.formGroup.get('nick')?.errors!;
    if ( errors['nickTomado'] ) {
        return 'Ese alias está siendo utilizando por otro usuario';
        }
    

    return '';
  }

  cargarAvatar() {
    this.dialogoAvatar = !this.dialogoAvatar;
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
        this.cargador.upAvatar(this.currentFile,this.usuario.nick).subscribe({
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

  obtenerImagen(usuario:Usuario){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(usuario.avatar)));
    const source = `data:image/png;base64,${base64String}`+usuario.avatar;
    return source;
  }

}
