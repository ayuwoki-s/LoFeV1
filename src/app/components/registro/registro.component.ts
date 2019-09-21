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
      sexoUsuario: ['', Validators.required],
      contrasenaUsuario: ['', Validators.required],
      NOCUENTA: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  noArguments() {
    this.modalCtr.dismiss();
  }

  onSubmitTemplate() {

    console.log('registro', this.registro);
    this.modalCtr.dismiss({
      item: this.registro.value // aqui estamos mandando el objeto del evento hacia el padre(Home.page.ts)
    });
  }

}
