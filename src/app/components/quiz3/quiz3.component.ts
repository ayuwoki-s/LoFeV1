import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-quiz3',
  templateUrl: './quiz3.component.html',
  styleUrls: ['./quiz3.component.scss'],
})
export class Quiz3Component implements OnInit {

  suma = 0;
  quiz1: any[] = [];
  checks = [
   {
    name: '1',
    valor: 0
   },
   {
    name: '2',
    valor: 1
   },
   {
    name: '3',
    valor: 2
   },
   {
    name: '4',
    valor: 3
   }
];

  constructor(
    private dataServ: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.dataServ.getQuiz3().subscribe( data => {
      this.quiz1 = data;
      // console.log('mis quiz son:', this.quiz1);
    });
  }

  obtenerValor(radio) {
    // console.log('seleccionaste:', radio);
    this.suma = this.suma + radio.valor;
    // console.log('tu suma es:', this.suma);
  }

  cerrar() {
    this.modalCtrl.dismiss({
      total: this.suma
    });
  }


}
