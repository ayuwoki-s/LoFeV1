import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  public id: number;

  // creamos un arreglo temporal
  private arr: any = [
    {
      id: 0,
      correoUsuario: '',
      contrasena: ''
    }
  ];

  // espacio para guardar datos de la db

  private usuarios: any[] = [];
  public eventoNuevo: any[] = [];
  public eventos: any[] = [];

  // inyectar HttpClient
  constructor( private http: Http,
               private https: HttpClient
  ) {
    this.getUsers().subscribe( data => {
      this.usuarios = data;
    });
  }

  // *funcion para guardar eventos nuevos
  guardarNuevoEvento(evento: any) {
    this.eventoNuevo = evento;
    console.log('guarde esto:', this.eventoNuevo);
  }

  // *funcion para obtener los amigos de amigo.json
  getFriends() {
    // return this.http.get<any[]>('/assets/data/amigo.json');
    return this.https.get<any[]>('/assets/data/amigo.json');
  }

  // *funcion para obtener las preguntas de la quiz1
  getQuiz1() {
    // return this.http.get<any[]>('/assets/data/amigo.json');
    return this.https.get<any[]>('/assets/data/quiz1.json');
  }

  // *funcion para obtener las preguntas de la quiz1
  getQuiz2() {
    // return this.http.get<any[]>('/assets/data/amigo.json');
    return this.https.get<any[]>('/assets/data/quiz2.json');
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

      // aqui obtener el id del usuario
      this.id = usuario.idUsuario;

      if ( user.indexOf( usuarioB) >= 0 ) {
        this.arr.correoUsuario = usuarioB;
        this.arr.id = this.id;
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

  getUserId() {
    return this.arr.id;
  }

  getEvento() {
    // return this.evento;
    return this.https.get<any[]>('/assets/data/eventos.json');
  }

  getEventoUsuario(id: number) {
    return this.https.get<any[]>(`http://localhost/apiLofe/public/api/eventos/${id}`);
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

  // POST para cuestionarios
  postQuiz( data ) {

    const headers = new Headers( // se definen los headers
      {
        'Content-Type' : 'application/json'
      });

    const options = new RequestOptions({ headers: headers }); // guardamos los headers en opciones

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/apiLofe/public/api/cuestionarios/post', JSON.stringify( data ), options)
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
  // Fin POST tabla cuestionarios para api

  // PUT para cuestionarios
  putQuiz( data, id, fecha ) {

    const headers = new Headers( // se definen los headers
      {
        'Content-Type' : 'application/json'
      });

    const options = new RequestOptions({ headers: headers }); // guardamos los headers en opciones

    return new Promise((resolve, reject) => {
      this.http.put(`http://localhost/apiLofe/public/api/cuestionarios/post/${id}/"${fecha}"`, JSON.stringify( data ), options)
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
  // Fin Put tabla cuestionarios para api

    // Get tabla usuarios de api
    getPParte(id, fecha) {
      // console.log('Estoy recibiendo esta fecha:', fecha);
      // console.log(`el query es: http://localhost/apiLofe/public/api/lugares/${id}/${fecha}`);
      return this.https.get<any[]>(`http://localhost/apiLofe/public/api/lugares/${id}/"${fecha}"`);
    }
    // Final Get


}
