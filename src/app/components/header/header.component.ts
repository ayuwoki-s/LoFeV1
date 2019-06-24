import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HeaderOptsComponent } from '../header-opts/header-opts.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() user: string;
  @Input() titulo: string;

  constructor(
    private pop: PopoverController
  ) { }

  ngOnInit() {}

  async mostrarOpts( event ) {
    const POP = await this.pop.create({
      component: HeaderOptsComponent,
      event
    });
    await POP.present();
  }

}
