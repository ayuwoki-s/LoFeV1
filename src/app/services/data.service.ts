import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // objeto de evento
  evento: any[] = [
    {
      idEvento: 1,
      NombreEvento: 'Pelea en los pasillos',
      Descripcion: 'Mi novio se peleo con mi amigo',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '3',
      Amigos_idAmigos: '4'
    },
    {
      idEvento: 2,
      NombreEvento: 'Me rei mucho',
      Descripcion: 'Lorem ipsum, ratione sequi deleniti sapoloremque corporis eveniet at ad nisi soluta laborum.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '1',
      Amigos_idAmigos: '6'
    },
    {
      idEvento: 3,
      NombreEvento: 'Pelea con mi novio',
      // tslint:disable-next-line:max-line-length
      Descripcion: 'Lorem ipsum dolor sit amet consectetur,sint dolores iusto ab quaerat assumenda debitis quas itaque dolore architecto inventore repellat hic.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '5',
      Amigos_idAmigos: '2'
    },
    {
      idEvento: 1,
      NombreEvento: 'Pelea en los pasillos',
      Descripcion: 'Mi novio se peleo con mi amigo',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '3',
      Amigos_idAmigos: '4'
    },
    {
      idEvento: 2,
      NombreEvento: 'Me rei mucho',
      Descripcion: 'Lorem ipsum, ratione sequi deleniti sapoloremque corporis eveniet at ad nisi soluta laborum.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '1',
      Amigos_idAmigos: '6'
    },
    {
      idEvento: 3,
      NombreEvento: 'Pelea con mi novio',
      // tslint:disable-next-line:max-line-length
      Descripcion: 'Lorem ipsum dolor sit amet consectetur,sint dolores iusto ab quaerat assumenda debitis quas itaque dolore architecto inventore repellat hic.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '5',
      Amigos_idAmigos: '2'
    },
    {
      idEvento: 1,
      NombreEvento: 'Pelea en los pasillos',
      Descripcion: 'Mi novio se peleo con mi amigo',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '3',
      Amigos_idAmigos: '4'
    },
    {
      idEvento: 2,
      NombreEvento: 'Me rei mucho',
      Descripcion: 'Lorem ipsum, ratione sequi deleniti sapoloremque corporis eveniet at ad nisi soluta laborum.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '1',
      Amigos_idAmigos: '6'
    },
    {
      idEvento: 3,
      NombreEvento: 'Pelea con mi novio',
      // tslint:disable-next-line:max-line-length
      Descripcion: 'Lorem ipsum dolor sit amet consectetur,sint dolores iusto ab quaerat assumenda debitis quas itaque dolore architecto inventore repellat hic.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '5',
      Amigos_idAmigos: '2'
    },
    {
      idEvento: 1,
      NombreEvento: 'Pelea en los pasillos',
      Descripcion: 'Mi novio se peleo con mi amigo',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '3',
      Amigos_idAmigos: '4'
    },
    {
      idEvento: 2,
      NombreEvento: 'Me rei mucho',
      Descripcion: 'Lorem ipsum, ratione sequi deleniti sapoloremque corporis eveniet at ad nisi soluta laborum.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '1',
      Amigos_idAmigos: '6'
    },
    {
      idEvento: 3,
      NombreEvento: 'Pelea con mi novio',
      // tslint:disable-next-line:max-line-length
      Descripcion: 'Lorem ipsum dolor sit amet consectetur,sint dolores iusto ab quaerat assumenda debitis quas itaque dolore architecto inventore repellat hic.',
      Fecha: '29',
      Lugar_idLugar: '2345',
      Emocion_idEmocion: '5',
      Amigos_idAmigos: '2'
    }
  ];

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
    return this.evento;
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
