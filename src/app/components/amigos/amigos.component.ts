import { Component, OnInit, EventEmitter } from '@angular/core';
// imports agregados por el programador
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.scss'],
})
export class AmigosComponent implements OnInit {

   amigos: any[] = [];
   textoBuscar = '';
   amig = {
     img: ''
   };

  // usaremos un modal asi que inyectamos el modalCtr
  constructor(
    private modalCtr: ModalController,
    private dataServ: DataService
  ) { }

  ngOnInit() {
   // this.amigos = this.dataServ.getFriends();
   this.dataServ.getUsers().subscribe( data => {
     console.log( data);
     this.amigos = data;
   });

   this.dataServ.getFriends().subscribe( data => {
      this.amig = data[0];
   });
  }

  // funcion cuando se presiona no etiquetar
  noArguments() {
    this.modalCtr.dismiss();
  }

  // funcion para buscar
  buscar( event ) {
    // revisar propiedad debounce cuando se hagan peticiones al servidor
    console.log( 'buscado', event);
    this.textoBuscar = event.detail.value; // para obtener el valor del buscador
  }

  // funcion cuando se selecciona un elemento
  onClick( event ) {
    console.log(event);
    this.modalCtr.dismiss({
      event // aqui estamos mandando el objeto del evento hacia el padre(Home.page.ts)
    });
  }

}
