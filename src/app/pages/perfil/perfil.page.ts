import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  eventos: any[] = [];

  constructor(
    private dataServ: DataService
  ) {
    this.eventos = this.dataServ.getEvento();
  }

  ngOnInit() {
  }

}
