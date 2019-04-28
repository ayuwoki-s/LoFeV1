import { Component, OnInit } from '@angular/core';
// ***Imports agregador por el programador
import { PopoverController, ModalController, ToastController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { AmigosComponent } from 'src/app/components/amigos/amigos.component';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'; // queda pendiente usar forBuilder aqui
// maps
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular'; // loading
declare var google; // declaracion del namespace

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

usuario: string;

validacion: any = {};
// datos para obtener la ubicacion por busqueda
// formattedAddress = 'Sin ubicación guardada';
formattedAddresslat: any;
formattedAddresslng: any;
options = {
  componentRestrictions : {
    country: ['MX']
  }
};

// *** Datos para guardar en la bd
evento = {
  NombreEvento: '',
  Descripcion: '',
  Imagen: 'default.png', // cuando se tenga plugin de camara
  Fecha: Date(), // iniciar a la fecha del dia
  Lugar_idLugar: ' Ubicacion no guardada.', // igualar a googlemaps 
  Emocion_idEmocion: '',
  Amigos_idAmigos: ''
};

  dat = {}; // para almacenar emojis
  da = {}; // para almacenar de amigos

// *** Datos para guardar en la bd
  amigoFlag = false; // bandera de amigo
  emojiFlag = false; // bandera de emoji
  i = 0; // contador que usaremos con el arreglo de emojis en el html

  // usaremos un popover asi que hay que inyectarlo...tambien usaremos modalCtr
  constructor(
    private popCtr: PopoverController,
    private modalCtr: ModalController,
    private dataSer: DataService,
    private formBuild: FormBuilder,
    private geolocation: Geolocation, // mapa
    private loadingCtrl: LoadingController, // loading
    private toast: ToastController
    ) {

      this.evento.Fecha = new Date().getDate().toString();

      this.usuario = this.dataSer.getUser();

      this.validacion = this.formBuild.group({
        titulo: ['', Validators.required],
        contenido: ['', Validators.required]
      });

    }

// **** Aqui comienzan las funciones****
  ngOnInit() {
    this.loadMap(); // Carga el mapa al iniciar
  }

  public handleAddressChange(address: any) {
    this.evento.Lugar_idLugar = address.formatted_address; // regresa un string con el nombre de la ubicacion
    this.formattedAddresslat = address.geometry.location.lat(); // regresa un number con la latitud buscada
    this.formattedAddresslng = address.geometry.location.lng(); // regresa un number con la longitud buscada
    const nueltln = { // objeto con las nuevas coordenadas
      lat: this.formattedAddresslat,
      lng: this.formattedAddresslng
    }
    console.log(this.evento.Lugar_idLugar, nueltln.lat , nueltln.lng);
    // this.evento.Lugar_idLugar = this.formattedAddress;
    // console.log(this.evento.Lugar_idLugar);

    const mapEle: HTMLElement = document.getElementById('map'); // elemento crear el mapa (canvas)
    // create map
    const map = new google.maps.Map(mapEle, {
      center: nueltln,
      zoom: 16
    });
    // añadir marker con la nueva ubicacion
  const marker = new google.maps.Marker({
    position: {
      lat: nueltln.lat,
      lng: nueltln.lng
    },
    map: map,
    title: 'Aquí Estas!'
  });
  }

  async loadMap() {
  const loading = await this.loadingCtrl.create(); // crea un loading
  loading.present();

  const rta = await this.geolocation.getCurrentPosition(); // obtiene posicion
  const myLatLng = { // objeto de coordenadas
    lat: rta.coords.latitude,
    lng: rta.coords.longitude,
    adr: 'Ubicacion por defecto'
  };

  console.log(myLatLng); // imprime las coordenadas acutles
  const mapEle: HTMLElement = document.getElementById('map'); // elemento crear el mapa (canvas)
  // create map
  const map = new google.maps.Map(mapEle, {
    center: myLatLng,
    zoom: 17
  });
  // añadir loading
  google.maps.event
  .addListenerOnce(map, 'idle', () => {
    console.log('Mapa Cargado');
    loading.dismiss(); // cierra el loading cuando esta cargado
  });
  // añadir marker
  const marker = new google.maps.Marker({
    position: {
      lat: myLatLng.lat,
      lng: myLatLng.lng
    },
    map: map,
    title: 'Aquí Estas!'
  });
  }

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
     this.dat = data; // para sacar nombre e imagen en el html
     this.emojiFlag = true;
     this.evento.Emocion_idEmocion = data.item.idEmoji;
     // this.emoji = data;
     this.i = this.i + 1; // el contador aumenta
     console.log('Mi emoji es:', this.evento.Emocion_idEmocion); // solo es para referenci
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
     this.da = data;
     this.evento.Amigos_idAmigos = data.event.idAmigo;
     // this.amigo = data;
     console.log('Informacion recibida en el padre', this.da ); // solo es para confirmar los datos recibidos
    }

    async presentToast( message: string ) {
      const toast = await this.toast.create({
        message,
        duration: 2000,
        position: 'middle',
        animated: true
      });
      toast.present();
    }

    onSubmitTemplate() {

      this.presentToast('Evento Publicado');
      console.log(this.evento);
      // usamos una funcion asincrona para recargar la pagina despues de publicar
      setTimeout( () => location.reload(), 3000);
    }

    prueba() {
      console.log('Objeto a enviar:', this.evento);
      console.log(JSON.stringify( this.evento )); // para visualizar si se hace la convercion 
    }

}
