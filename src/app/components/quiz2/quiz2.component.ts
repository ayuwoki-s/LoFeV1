import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-quiz2',
  templateUrl: './quiz2.component.html',
  styleUrls: ['./quiz2.component.scss'],
})
export class Quiz2Component implements OnInit {

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
    this.dataServ.getQuiz2().subscribe( data => {
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
