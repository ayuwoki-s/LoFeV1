import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  emojis: any[] = [];

  // simulando los emojis de la bd


  // como estamos usando popover debemos inyectar su cotrolador para poder hacerle dissmis, tambien usaremos servicios
  constructor(
    private popOverCtr: PopoverController,
    private dataser: DataService
  ) {
    this.dataser.getEmojis().subscribe( data => {
      this.emojis = data;
      console.log( data);
      console.log( this.emojis);
    });

  }

  ngOnInit() {}

  // funcion para poder seleccioar opcion
  onClick( emoji ) {

    console.log( 'Elemento enviado: ', emoji );
    // aqui cerramos el popover al ser precionado el elemento y le mandamos los parametros por el dissmis
    this.popOverCtr.dismiss({
      // esto es lo que se va a mandar
      item: emoji
    });
  }

}
