import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabasPage } from './tabas.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public'
  },
  {
    path: '',
    component: TabasPage,
    // debemos cargar rutas hijas para que tabs funcione
    children: [
      {
        path: 'public',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'perfil',
        loadChildren: '../perfil/perfil.module#PerfilPageModule'
      },
      {
        path: 'social',
        loadChildren: '../amigos/amigos.module#AmigosPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabasPage]
})
export class TabasPageModule {}
