import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  // creamos un arreglo temporal
  private arr: any = [
    {
      correoUsuario: '',
      contrasena: ''
    }
  ];

  // espacio para guardar datos de la db

  private usuarios: any[] = [];

  // inyectar HttpClient
  constructor( private http: Http,
               private https: HttpClient
  ) {
    this.getUsers().subscribe( data => {
      this.usuarios = data;
    });
  }

  // *funcion para obtener los amigos de amigo.json
  getFriends() {
    // return this.http.get<any[]>('/assets/data/amigo.json');
    return this.https.get<any[]>('/assets/data/amigo.json');
  }

  // *funcion para obtener usuarios
  getUsuarios() {
    return this.usuarios;
  }

  // *funcion par buscar usuario
  buscarUsuario( usuarioB: string, contrasenaB: string ) {

    for (let usuario of this.usuarios) {

      const user = usuario.correoUsuario;
      const pass = usuario.contrasenaUsuario;

      if ( user.indexOf( usuarioB) >= 0 ) {
        this.arr.correoUsuario = usuarioB;
      } if ( pass.indexOf( contrasenaB) >= 0 ) {
        this.arr.contrasena = contrasenaB;
      }
    }
    try {

      if ((this.arr.correoUsuario.length >= 1) && (this.arr.contrasena.length >= 1)) {
        return true;
      } else {
      return false; }
    } catch (error) {
      console.log('Usuario o contraseña no corresponden', error);
      return false;
    }
  }

  // *Funcion obtener usuario para header
  getUser() {
    return this.arr.correoUsuario;
  }

  getEvento() {
    // return this.evento;
    return this.https.get<any[]>('/assets/data/eventos.json');
  }

  // regresa la consulta de amigos
  getOtherFriends() {
    return this.https.get<any[]>('/assets/data/addFriend.json');
  }

  // regresa la consulta de los emojis
  getEmojis() {
    return this.https.get<any[]>('/assets/data/emojis.json');
  }

  // ******************************** Zona de metodos que consumen la api

  // Get tabla usuarios de api
  getUsers() {
    return this.https.get<any[]>(`http://localhost/apiLofe/public/api/usuarios`);
  }
  // Final Get

  // Put tabla usuarios para api
  putUser( data ) {

    const headers = new Headers( // se definen los headers
      {
        'Content-Type' : 'application/json'
      });

    const options = new RequestOptions({ headers: headers }); // guardamos los headers en opciones

    this.arr.correoUsuario = data.correoUsuario;
    return new Promise((resolve, reject) => { // creamos una promesa
      this.http.post('http://localhost/apiLofe/public/api/usuarios/post', JSON.stringify( data ), options)
      .toPromise()  // has esto..
      .then((response) => { // si hay respuesta favorable
        console.log('API Response : ', response.json());
        resolve(response.json());
      })
      .catch((error) => { // si hay un reject
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        reject(error.json());
      });
    });
  }

  putEvent( data ) {

    const headers = new Headers( // se definen los headers
      {
        'Content-Type' : 'application/json'
      });

    const options = new RequestOptions({ headers: headers }); // guardamos los headers en opciones

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/apiLofe/public/api/eventos/post', JSON.stringify( data ), options)
      .toPromise()
      .then((response) => {
        console.log('API Response : ', response.json());
        resolve(response.json());
      })
      .catch((error) => {
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        reject(error.json());
      });
    });
  }
  // Fin Put tabla usuarios para api

}
