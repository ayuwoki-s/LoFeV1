import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { IonicModule } from '@ionic/angular';
// imports agregador
import { AmigosComponent } from './amigos/amigos.component';
import { PipesModule } from '../pipes/pipes.module';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HeaderOptsComponent } from './header-opts/header-opts.component';

@NgModule({
  entryComponents: [
    HeaderOptsComponent
  ],
  declarations: [
    PopinfoComponent,
    AmigosComponent,
    RegistroComponent,
    HeaderComponent,
    HeaderOptsComponent
  ],
  exports: [
    PopinfoComponent,
    AmigosComponent,
    RegistroComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class ComponentsModule { }
