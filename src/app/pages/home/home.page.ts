import { Component, OnInit } from '@angular/core';
// ***Imports agregados por el programador
import { PopoverController, ModalController, ToastController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';
import { AmigosComponent } from 'src/app/components/amigos/amigos.component';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms'; // queda pendiente usar forBuilder aqui
import { Quiz1Component } from 'src/app/components/quiz1/quiz1.component';
import { Quiz2Component } from 'src/app/components/quiz2/quiz2.component';
import {isNullOrUndefined} from 'util';
import { NavController } from '@ionic/angular';
// maps
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular'; // loading
// camara
import { Camera, CameraOptions, DestinationType } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Quiz3Component } from 'src/app/components/quiz3/quiz3.component';

declare var google; // declaracion del namespace

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

id: number;
usuario: string;
ubicacion: any;
image: string;
validacion: any = {};
respuestaCuest: any;
respuestaCuest2: any;
respuestaCuest3: any;

// datos para obtener la ubicacion por busqueda
// formattedAddress = '';
formattedAddresslat: any;
formattedAddresslng: any;
options = {
  componentRestrictions : {
    country: ['MX']
  }
};

// *** Datos para guardar en la bd
evento = {
  Usuario: this.id,
  NombreEvento: '',
  Descripcion: '',
  Imagen: 'default.png', // cuando se tenga plugin de camara
  Fecha: '', // iniciar a la fecha del dia
  Lugar_idLugar: '', // igualar a googlemaps ----- este dato seria reemplazado por formattedAddress (creo :v)
  Emocion_idEmocion: '',
  Usuario_idUsuario: ''
};

  amigo: any;
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
    private camera: Camera, // camara
    private webView: WebView,
    private loadingCtrl: LoadingController, // loading
    private toast: ToastController,
    private navCtrl: NavController
    // private user: string
    ) {

      this.evento.Fecha = new Date().getDate().toString();

      this.usuario = this.dataSer.getUser();

      this.validacion = this.formBuild.group({
        titulo: ['', Validators.required],
        contenido: ['', Validators.required]
      });

      this.dataSer.getFriends().subscribe( data => {
        this.amigo = data[0];
      });

      this.id = this.dataSer.getUserId();
      this.evento.Usuario = this.id;
      // console.log('el id el usuario es:', this.id);
      // console.log('ya te dije que el id el usuario es:', this.evento.Usuario);
    }

// **** Aqui comienzan las funciones****
  ngOnInit() {
    this.loadMap(); // Carga el mapa al iniciar

    this.obtenerFecha();

    this.consultarPParte();

    this.consultarSParte();

    this.consultarTParte();
  }

  aHome() {
    this.navCtrl.navigateRoot('tabas/perfil');
  }

  obtenerFecha() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) {
      // this.evento.Fecha = `${day}-0${month}-${year}`;
      this.evento.Fecha = `${year}-${month}-${day}`;
      console.log('la fecha es:', this.evento.Fecha);
    } else {
      // this.evento.Fecha = `${day}-0${month}-${year}`;
      this.evento.Fecha = `${year}-${month}-${day}`;
      console.log(this.evento.Fecha);
    }
  }

  consultarPParte() {
      this.dataSer.getPParte(this.id, this.evento.Fecha).subscribe( data => {
      // console.log('enviare esta fecha:', this.evento.Fecha);
      this.respuestaCuest = data;
      console.log('mis cuestionarios son:', this.respuestaCuest);
    });
  }

  consultarSParte() {
    this.dataSer.getSParte( this.id, this.evento.Fecha).subscribe( data => {
      this.respuestaCuest2 = data[0].cuestionarioSPartel;
      console.log('respuesta de SPARTE:', this.respuestaCuest2);
    });
  }

  consultarTParte() {
    this.dataSer.getTParte( this.id, this.evento.Fecha).subscribe( data => {
      this.respuestaCuest3 = data[0].cuestionarioTParte;
      console.log('respuesta de TPARTE:', this.respuestaCuest3);
    });
  }

  public handleAddressChange2( event ) {
    console.log('hola', event);
  }

  public handleAddressChange(address: any) {
    this.evento.Lugar_idLugar = address.formatted_address; // regresa un string con el nombre de la ubicacion
    this.formattedAddresslat = address.geometry.location.lat(); // regresa un number con la latitud buscada
    this.formattedAddresslng = address.geometry.location.lng(); // regresa un number con la longitud buscada
    const nueltln = { // objeto con las nuevas coordenadas
      lat: this.formattedAddresslat,
      lng: this.formattedAddresslng
    }
    // console.log(this.evento.Lugar_idLugar, nueltln.lat , nueltln.lng);
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
    lng: rta.coords.longitude
  };

  // console.log(myLatLng); // imprime las coordenadas acutles
  const mapEle: HTMLElement = document.getElementById('map'); // elemento crear el mapa (canvas)
  // create map
  const map = new google.maps.Map(mapEle, {
    center: myLatLng,
    zoom: 17
  });
  // añadir loading
  google.maps.event
  .addListenerOnce(map, 'idle', () => {
    // console.log('Mapa Cargado');
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

  // funciones de camara
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.image = this.webView.convertFileSrc(imageData);
      this.evento.Imagen = this.image;
      // this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
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
     // console.log('Elemento recibido', data);
     this.dat = data; // para sacar nombre e imagen en el html
     this.emojiFlag = true;
     this.evento.Emocion_idEmocion = data.item.idEmoji;
     // this.emoji = data;
     this.i = this.i + 1; // el contador aumenta
     // console.log('Mi emoji es:', this.evento.Emocion_idEmocion); // solo es para referenci
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
     this.evento.Usuario_idUsuario = data.event.idUsuario;
     // this.amigo = data;
     // console.log('Informacion recibida en el padre', this.da ); // solo es para confirmar los datos recibidos
    }

    async presentToast( message: string ) {
      const toast = await this.toast.create({
        message,
        duration: 2000,
        position: 'middle',
        cssClass: 'toast'
      });
      toast.present();
    }

    publicar() {
      this.post();
    }

    reload() {

      this.evento = {
        Usuario: this.id,
        NombreEvento: '',
        Descripcion: '',
        Imagen: 'default.png', // cuando se tenga plugin de camara
        Fecha: Date(), // iniciar a la fecha del dia
        Lugar_idLugar: '', // igualar a googlemaps ----- este dato seria reemplazado por formattedAddress (creo :v)
        Emocion_idEmocion: '',
        Usuario_idUsuario: ''
      };
      this.amigoFlag = false;
      this.emojiFlag = false;
    }

    async prueba() {

      const QUIZ = await this.modalCtr.create({
        component: Quiz1Component
      });

      await QUIZ.present();

      const { data } = await QUIZ.onDidDismiss();

      const jsonCuestionario = {
        usuario_idUsuario: this.id,
        cuestionarioPParte: data.total,
        cuestionarioFecha: this.evento.Fecha
      };

      console.log('El primer json a enviar es:', jsonCuestionario);

      this.dataSer.postQuiz( jsonCuestionario );
      this.aHome();
    }

    async prueba2() {
      const QUIZ = await this.modalCtr.create({
      component: Quiz2Component
      });

      await QUIZ.present();

      const { data } = await QUIZ.onDidDismiss();

      const jsonCuestionario = {
        cuestionarioSPartel: data.total
      };

      console.log('El segundo json a enviar es:', jsonCuestionario);
      this.dataSer.putQuiz( jsonCuestionario, this.id, this.evento.Fecha );
      this.aHome();

    }

    async prueba3() {
      const QUIZ = await this.modalCtr.create({
      component: Quiz3Component
      });

      await QUIZ.present();

      const { data } = await QUIZ.onDidDismiss();

      const jsonCuestionario = {
        cuestionarioTParte: data.total
      };

      console.log('El tercer json a enviar es:', jsonCuestionario);
      this.dataSer.putQuiz3( jsonCuestionario, this.id, this.evento.Fecha );
      this.aHome();

    }

    post() {
      if ( Array.isArray(this.respuestaCuest) === true) {
        this.consultarSParte();
        this.consultarTParte();
        if (isNullOrUndefined(this.respuestaCuest2)) {
          console.log('te falta responder el segundo cuestionario!');
          console.log('se abre segunda parte del cuestionario');
          this.prueba2();
          // **
          this.publicacion();

        } else
        if (isNullOrUndefined(this.respuestaCuest3)) {
          console.log('el quiz3 tiene', this.respuestaCuest3);
          console.log('te falta responder el tercer cuestionario!');
          console.log('se abre tercera parte del cuestionario');
          this.prueba3();
          this.publicacion();
        } else {
          console.log('el quiz3 tiene', this.respuestaCuest3);
          console.log('Ya se han respondido los 3 cuestionarios por hoy, publicacion normal!');
          this.publicacion();
          this.reload();
        }
        console.log('Tienes un arreglo!');
      } else {

        console.log('Debes responder el primer cuestionario');
        console.log('se abre primera parte del cuestionario');
        this.prueba();

        this.publicacion();
      }
    }

    publicacion( ) {
      console.log('Objeto a enviar:', this.evento);
      // console.log(JSON.stringify( this.evento )); // para visualizar si se hace la convercion
      this.dataSer.putEvent( this.evento);
      // this.dataSer.guardarNuevoEvento(this.evento);
      this.presentToast('Evento publicado');
    }

}
