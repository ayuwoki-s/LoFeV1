import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { RegistroComponent } from 'src/app/components/registro/registro.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // se inyectan los modulos servicios y controladores que usaremos
  constructor(
    private dataServ: DataService, // nuestro servicio 
    private route: Router, // para usar navigated mas abajo
    private modalCtr: ModalController, // para abrir la ventana de registro
    public toastController: ToastController,
    private navCtrl: NavController
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  ngOnInit() {
    this.dataServ.getUsers().subscribe( data => {
      console.log('los usuarios son:', data);
    });
  }

  aHome() {
    this.navCtrl.navigateRoot('login');
  }

  // cuando se presiona el boton ingresar
  onSubmitTemplate( usuario: string, password: string) {

    // console.log('formulario terminado');
    // console.log('usuario' , usuario, 'y password', password);

    if ( this.dataServ.buscarUsuario( usuario, password) === true ) {
      this.route.navigate(['/tabas/public']);
    } else {
      this.presentToast('Usuario o contraseña incorrectos');
      // console.log('Acceso denegado');
    }

  }

  // para abrir registro
  async abrirRegistro() {
    const registro = await this.modalCtr.create({
      component: RegistroComponent
    });

    await registro.present();

    const { data } = await registro.onDidDismiss();

    this.dataServ.putUser(data.item);

    console.log( 'datos a guardar:', data.item );

    this.presentToast('Usuario registrado, inicie sesión');

    // this.aHome();
    setTimeout( () => location.reload(), 1000);
    // this.route.navigate(['/tabas/public']);
  }

}
