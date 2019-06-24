import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-header-opts',
  templateUrl: './header-opts.component.html',
  styleUrls: ['./header-opts.component.scss'],
})
export class HeaderOptsComponent implements OnInit {

  constructor(
    private router: Router,
    private pop: PopoverController
  ) { }

  ngOnInit() {}

  logOut() {
    this.router.navigate(['/login']);
    this.pop.dismiss();
  }

}
