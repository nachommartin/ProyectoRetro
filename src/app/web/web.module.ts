import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';
import { ResultadosComponent } from './resultados/resultados.component';
import { JuegoComponent } from './juego/juego.component';
import { ReviewComponent } from './review/review.component';
import { ChildComponent } from './child/child.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditComponent } from './edit/edit.component';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { MySeguidoresComponent } from './my-seguidores/my-seguidores.component';
import { SiguiendoComponent } from './siguiendo/siguiendo.component';
import { VotosComponent } from './votos/votos.component';
import { EnvioMensajeComponent } from './envio-mensaje/envio-mensaje.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { MisListasComponent } from './mis-listas/mis-listas.component';
import { CreacionListaComponent } from './creacion-lista/creacion-lista.component';
import { ListaComponent } from './lista/lista.component';
import { ListaUsuarioComponent } from './lista-usuario/lista-usuario.component';
import { MasVotadosComponent } from './mas-votados/mas-votados.component';
import {DataViewModule} from 'primeng/dataview';
import { MejorMediaComponent } from './mejor-media/mejor-media.component';
import { DialogModule } from 'primeng/dialog';
import { FooterComponent } from './footer/footer.component';
import {ButtonModule} from 'primeng/button';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import { MyVotosComponent } from './my-votos/my-votos.component';
import {TimelineModule} from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import {BadgeModule} from 'primeng/badge';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    ResultadosComponent,
    JuegoComponent,
    ReviewComponent,
    ChildComponent,
    UsuarioComponent,
    EditComponent,
    ComunidadComponent,
    MySeguidoresComponent,
    SiguiendoComponent,
    VotosComponent,
    EnvioMensajeComponent,
    MensajeComponent,
    MisListasComponent,
    CreacionListaComponent,
    ListaComponent,
    ListaUsuarioComponent,
    MasVotadosComponent,
    MejorMediaComponent,
    FooterComponent,
    MyVotosComponent,
    MyReviewsComponent,
    ListaJuegosComponent  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebRoutingModule,
    DataViewModule,
    DialogModule,
    ButtonModule,
    BreadcrumbModule,
    MenuModule,
    TimelineModule,
    CardModule,
    NgxPaginationModule,
    ConfirmDialogModule,
    ToastModule,
    BadgeModule,
    TableModule

    
  ],
  exports:
  [ NavbarComponent, FooterComponent]
})
export class WebModule { }
