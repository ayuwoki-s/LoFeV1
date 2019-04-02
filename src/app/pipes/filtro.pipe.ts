import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  // va a recibir un arreglo de tipo any y un texto, retonara un arreglo de tipo any
  transform( arreglo: any[], texto: string, columna: string): any[] {

    if ( texto === '') { // si el arreglo biene vacio se regresa el mismo arreglo
      return arreglo;
    }

   texto = texto.toLowerCase(); // pasamos el texto buscado a minusculas

   return arreglo.filter( item => {  // usamos un doble return para que funcione como funcion asincrona
     return item[columna].toLowerCase().includes( texto );
   });

  }

}
