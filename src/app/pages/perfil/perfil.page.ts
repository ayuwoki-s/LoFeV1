import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  eventos: Observable<any>; // se usan observables en lugar de objetos

  constructor(
    private dataServ: DataService
  ) {
    this.eventos = this.dataServ.getEvento();
  }

  ngOnInit() {
  }

}
