import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { AmigosComponent } from 'src/app/components/amigos/amigos.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Quiz1Component } from 'src/app/components/quiz1/quiz1.component';
import { Quiz2Component } from 'src/app/components/quiz2/quiz2.component';
import { Quiz3Component } from 'src/app/components/quiz3/quiz3.component';

@NgModule({
  // para usar popover debemos declarar en el entry tambien pata el amigos page(modal)
  entryComponents: [
    PopinfoComponent,
    AmigosComponent,
    Quiz1Component,
    Quiz2Component,
    Quiz3Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglePlaceModule,
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
