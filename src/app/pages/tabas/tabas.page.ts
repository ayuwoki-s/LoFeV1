import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabas',
  templateUrl: './tabas.page.html',
  styleUrls: ['./tabas.page.scss'],
})
export class TabasPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  aHome() {
    this.navCtrl.navigateRoot('home');
  }

}
