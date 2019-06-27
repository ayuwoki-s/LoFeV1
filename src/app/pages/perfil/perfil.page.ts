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
  }

}
