import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; // importar para usar Forms

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registro: any = {}; // v1.crear un objeto vacio

  persona = {
      nombreP: '',
      apellidos: '',
      correo: '',
      usuario: '',
      contrasena: ''
    };
  constructor(
    private modalCtr: ModalController,
    private formBuil: FormBuilder // v2. inyectar
  ) {

    this.registro = this.formBuil.group({ // v.3 crear estructura de validacion
      nombreP: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      usuario: ['', Validators.required],
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

}
