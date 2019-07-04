import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  // eventos: Observable<any>; // se usan observables en lugar de objetos
  eventos: any[] = [];
  id: number;
  Fecha: string;

  constructor(
    private dataServ: DataService
  ) {

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (month < 10) {
      // this.evento.Fecha = `${day}-0${month}-${year}`;
      this.Fecha = `${year}-${month}-${day}`;
      // console.log(this.evento.Fecha);
    } else {
      // this.evento.Fecha = `${day}-0${month}-${year}`;
      this.Fecha = `${year}-${month}-${day}`;
      // console.log(this.evento.Fecha);
    }

    // this.eventos = this.dataServ.getEvento();
    this.id = this.dataServ.getUserId();

    this.dataServ.getEventoUsuario(this.id).subscribe( data => {
      console.log('la historia de este usuario es:', data);
      this.eventos = data;
    });
    // this.eventos.unshift(this.dataServ.eventoNuevo);
    // this.dataServ.getPParte(this.id, this.Fecha).subscribe( data => {
    //   console.log('mis cuestionarios son:', data);
    // });
    
  }

  ngOnInit() {}

  }
