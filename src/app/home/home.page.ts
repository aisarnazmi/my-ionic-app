import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // title: any;
  title!: string;
  // title = 'myIonicApp';

  constructor() {}

  ngOnInit(): void {
    this.title = 'myIonicApp';
  }
}
