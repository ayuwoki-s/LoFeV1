import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; // importar para usar Forms
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registro: any = {}; // v1.crear un objeto vacio

  constructor(
    private modalCtr: ModalController,
    private formBuil: FormBuilder, // v2. inyectar
    private dataSer: DataService,
  ) {

    this.registro = this.formBuil.group({ // v.3 crear estructura de validacion
      nombresUsuario: ['', Validators.required],
      APAUsuario: ['', Validators.required],
      AMAUsuario: ['', Validators.required],
      correoUsuario: ['', Validators.required],
      nicknameUsuario: ['', Validators.required],
      imagenUsuario: ['', Validators.required],
      contrasenaUsuario: ['', Validators.required]
    });
  }

  ngOnInit() {}

  noArguments() {
    this.modalCtr.dismiss();
  }

  onSubmitTemplate() {

    console.log('registro', this.registro);
    this.modalCtr.dismiss({
      item: this.registro // aqui estamos mandando el objeto del evento hacia el padre(Home.page.ts)
    });
  }

  // *Funcion para meter los datos en la bd
prueba() {
  console.log(this.registro.value); // solo para visualizar datos ingresado

  console.log(JSON.stringify( this.registro.value )); // para visualizar si se hace la convercion 

  this.dataSer.putUser(this.registro.value);
  }
}
