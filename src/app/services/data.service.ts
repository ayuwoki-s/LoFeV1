import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // creamos un arreglo temporal
  private arr: any = [
    {
      NombreUsuario: '',
      contrasena: ''
    }
  ];

  // simulamos un arreglo de usuarios esto lo obtendremos de la BD
  private usuarios: any[] = [
    {
      idUsuario: 1,
      NombreUsuario: 'genecc4@gmail.com',
      contrasena: '123',
      img: '/assets/img/0p.jpg'
    },
    {
      idUsuario: 2,
      NombreUsuario: 'oscar@gmail.com',
      contrasena: '123'
    },
    {
      idUsuario: 3,
      NombreUsuario: 'angel@gmail.com',
      contrasena: '123'
    },
    {
      idUsuario: 4,
      NombreUsuario: 'osvaldo@gmail.com',
      contrasena: '123'
    },
  ];

  // inyectar HttpClient
  constructor( private http: HttpClient) { }

  // *funcion para obtener los amigos de amigo.json
  getFriends() {
    return this.http.get<any[]>('/assets/data/amigo.json');
  }

  // *funcion para obtener usuarios
  getUsuarios() {
    return this.usuarios;
  }

  // *funcion para buscar usuario
  buscarUsuario( usuarioB: string, contrasenaB: string ) {

    for (let usuario of this.usuarios) {

      const user = usuario.NombreUsuario;
      const pass = usuario.contrasena;

      if ( user.indexOf( usuarioB) >= 0 ) {
        this.arr.NombreUsuario = usuarioB;
      } if ( pass.indexOf( contrasenaB) >= 0 ) {
        this.arr.contrasena = contrasenaB;
      }
    }
    try {

      if ((this.arr.NombreUsuario.length >= 1) && (this.arr.contrasena.length >= 1)) {
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
    return this.arr.NombreUsuario;
  }

  getEvento() {
    // return this.evento;
    return this.http.get<any[]>('/assets/data/eventos.json');
  }

  // regresa la consulta de amigos
  getOtherFriends() {
    return this.http.get<any[]>('/assets/data/addFriend.json');
  }

  // regresa la consulta de los emojis
  getEmojis() {
    return this.http.get<any[]>('/assets/data/emojis.json');
  }
}
