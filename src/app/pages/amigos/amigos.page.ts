import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  // Creamos un ViewChild para poder manipular el elemento html desde el ts
  @ViewChild('lista') lista: IonList;
  // usamos un contenedor local
  textoBuscar = '';
  friends: any[] = [];
  amigo: any;

  // usaremos un servicio para traer los datos asi que debemos inyectarlo
  constructor(
    private dataServ: DataService,
    // private toast: ToastController
  ) { }

  ngOnInit() {
    // guardamos los datos de la consulta para usarla en el html
    this.dataServ.getUsers().subscribe( data => {
      this.friends = data;
      // console.log('prueba de data', data);
    });

    this.dataServ.getFriends().subscribe( data => {
      this.amigo = data[0].img;
      // console.log('mi amigo', data[0].img);
    });
  }

  buscar( event ) {
    // revisar propiedad debounce cuando se hagan peticiones al servidor
    console.log( 'buscado', event);
    this.textoBuscar = event.detail.value; // para obtener el valor del buscador
  }
  /*async presentToast( message: string ) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: 'top',
      animated: true
    });
    toast.present();
  }*/

  // favorite( friend ) {
  //   this.presentToast('Añadido a lista de amigos');
  //   console.log('amigo seleccionado', friend);
  //   this.lista.closeSlidingItems();
  // }

  // share( friend ) {
  //   this.presentToast('Se abre perfil del amigo');
  //   console.log('amigo seleccionado', friend);
  //   this.lista.closeSlidingItems();
  // }

}
