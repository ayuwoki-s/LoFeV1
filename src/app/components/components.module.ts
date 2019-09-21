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
import { Quiz1Component } from './quiz1/quiz1.component';
import { Quiz2Component } from './quiz2/quiz2.component';
import { Quiz3Component } from './quiz3/quiz3.component';

@NgModule({
  entryComponents: [
    HeaderOptsComponent
  ],
  declarations: [
    PopinfoComponent,
    AmigosComponent,
    RegistroComponent,
    HeaderComponent,
    HeaderOptsComponent,
    Quiz1Component,
    Quiz2Component,
    Quiz3Component
  ],
  exports: [
    PopinfoComponent,
    AmigosComponent,
    RegistroComponent,
    HeaderComponent,
    Quiz1Component,
    Quiz2Component,
    Quiz3Component
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
