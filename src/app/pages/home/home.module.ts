import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { AmigosComponent } from 'src/app/components/amigos/amigos.component';

@NgModule({
  // para usar popover debemos declarar en el entry tambien pata el amigos page(modal)
  entryComponents: [
    PopinfoComponent,
    AmigosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
