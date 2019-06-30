import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quiz1',
  templateUrl: './quiz1.component.html',
  styleUrls: ['./quiz1.component.scss'],
})
export class Quiz1Component implements OnInit {

  public sexe: string;

  quiz1: any[] = [];
  checks = [
   {
    name: 'primary',
    selected: false
   },
   {
    name: 'secondary',
    selected: false
   },
   {
    name: 'tertiary',
    selected: false
   },
   {
    name: 'primary',
    selected: false
   }
];

  constructor(private dataServ: DataService) { }

  ngOnInit() {
    this.dataServ.getQuiz1().subscribe( data => {
      this.quiz1 = data;
      console.log('mis quiz son:', this.quiz1);
    });
  }

  onClick(check) {
    console.log(check);
    if (check.selected === false) {
      
    }
  }

}
