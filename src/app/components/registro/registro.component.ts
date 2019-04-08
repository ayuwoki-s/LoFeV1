import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; // importar para usar Forms
import { DataService } from 'src/app/services/data.service';
import { Http, Headers, RequestOptions } from '@angular/http';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registro: any = {}; // v1.crear un objeto vacio

  persona = {};

  constructor(
    private modalCtr: ModalController,
    private formBuil: FormBuilder, // v2. inyectar
    private dataSer: DataService,
    private http: Http
  ) {

    this.registro = this.formBuil.group({ // v.3 crear estructura de validacion
      nombreP: ['', Validators.required],
      apellidosP: ['', Validators.required],
      apellidosM: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
      imagen: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit() {}

  noArguments() {
    this.modalCtr.dismiss();
  }

  onClick( ) {
    console.log(this.persona);
    this.modalCtr.dismiss({
      item: this.persona // aqui estamos mandando el objeto del evento hacia el padre(Home.page.ts)
    });
  }

  onSubmitTemplate() {

    console.log('registro', this.registro);
    this.modalCtr.dismiss({
      item: this.persona // aqui estamos mandando el objeto del evento hacia el padre(Home.page.ts)
    });
  }

  // *Funcion para meter los datos en la bd
prueba() {
  console.log(this.persona); // solo para visualizar datos ingresado

  console.log(JSON.stringify( this.persona )); // para visualizar si se hace la convercion 

  this.dataSer.putUser(this.persona);
  }
}
