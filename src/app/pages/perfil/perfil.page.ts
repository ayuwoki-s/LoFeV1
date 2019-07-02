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
  fecha: string;

  constructor(
    private dataServ: DataService
  ) {
    // this.eventos = this.dataServ.getEvento();
    this.id = this.dataServ.getUserId();

    this.dataServ.getEventoUsuario(this.id).subscribe( data => {
      // console.log('mis eventos:', data);
      this.eventos = data;
    });
    // this.eventos.unshift(this.dataServ.eventoNuevo);
  }

  ngOnInit() {
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

if(month < 10){
  this.fecha = `${day}-0${month}-${year}`;
  console.log(this.fecha);
}else{
  this.fecha = `${day}-${month}-${year}`;
  console.log(this.fecha);
}
  }
}
