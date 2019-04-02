import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistroComponent } from 'src/app/components/registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private dataServ: DataService,
    private route: Router,
    private modalCtr: ModalController
  ) { }

  ngOnInit() {
  }

  onSubmitTemplate( usuario: string, password: string) {

    console.log('formulario terminado');
    console.log('usuario' , usuario, 'y password', password);

    if ( this.dataServ.buscarUsuario( usuario, password) === true ) {
      this.route.navigate(['/tabas/public']);
    } else {
      console.log('Acceso denegado');
    }

  }

  async abrirRegistro() {
    const registro = await this.modalCtr.create({
      component: RegistroComponent
    });

    await registro.present();

    const { data } = await registro.onDidDismiss();

    console.log( data );

    this.route.navigate(['/tabas/public']);
  }

}
