import { Component} from '@angular/core';
// ***Imports agregador por el programador
import { PopoverController, ModalController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { AmigosComponent } from 'src/app/components/amigos/amigos.component';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'; // queda pendiente usar forBuilder aqui

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

usuario: string;

validacion: any = {};

// *** Datos para guardar en la bd
evento = {
  nombreEvento: '',
  descripcion: '',
  imagen: '', // cuando se tenga plugin de camara
  fecha: Date(), // iniciar a la fecha del dia
  lugar: 'Google', // igualar a googlemaps
  emoji: '',
  amigo: ''
};
// *** Datos para guardar en la bd
  amigoFlag = false; // bandera de amigo
  emojiFlag = false; // bandera de emoji
  i = 0; // contador que usaremos con el arreglo de emojis en el html

  // usaremos un popover asi que hay que inyectarlo...tambien usaremos modalCtr
  constructor(
    private popCtr: PopoverController,
    private modalCtr: ModalController,
    private dataSer: DataService,
    private formBuild: FormBuilder
    ) {
      this.evento.fecha = new Date().getDate().toString();
      this.usuario = this.dataSer.getUser();

      this.validacion = this.formBuild.group({
        titulo: ['', Validators.required],
        contenido: ['', Validators.required]
      });
    }

// **** Aqui comienzan las funciones****

  //  *funcion para mostrar pop over
   async mostrarPop( event ) {

     const popover = await this.popCtr.create({
      // objeto de configuracion
       component: PopinfoComponent,
       event,
       mode: 'ios',
       backdropDismiss: false // para forzar la interaccion
     });

     // hay que presentar el popover
     await popover.present();

     // para recibir los datos del popoverinfo usamos la desestructuracion
     const { data } = await popover.onDidDismiss();
     console.log('Elemento recibido', data);
     this.emojiFlag = true;
     this.evento.emoji = data;
     // this.emoji = data;
     this.i = this.i + 1; // el contador aumenta
     console.log('Mi emoji es:', this.evento.emoji); // solo es para referenci
   }

   // *Funcion para abrir pagina de amigos(Modal) se pone async por que usamos awaits dentro
  async openFriends() {
    // lo sig crea el modal hacia Amigos
    const friends = await this.modalCtr.create({
       component: AmigosComponent // , Codigo comentado para documentacion
      //  componentProps: {
      //    nombre: 'Bryan',
      //    pais: 'Mexico'
      //  }
     });
     // lo siguiente abre el modal
     await friends.present();

     const { data } = await friends.onDidDismiss(); // usando la destructuracion podemos recibir y extraer los datos del modal
     this.amigoFlag = true; // cambiar a true la bandera para usarla en el html
     this.evento.amigo = data;
     // this.amigo = data;
     console.log('Informacion recibida en el padre', data ); // solo es para confirmar los datos recibidos
    }

    onSubmitTemplate() {

      console.log(this.evento);
      // usamos una funcion asincrona para recargar la pagina despues de publicar
      setTimeout( () => location.reload(), 3000);
    }

}
