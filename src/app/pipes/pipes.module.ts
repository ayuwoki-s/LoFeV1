import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';

@NgModule({
  declarations: [FiltroPipe],
  exports: [
    FiltroPipe // debemos exportar nuestro filtro personalizado para usarlo en otros modulos
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
