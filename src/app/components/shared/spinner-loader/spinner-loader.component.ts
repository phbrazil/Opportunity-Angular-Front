import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})
export class SpinnerLoaderComponent implements OnInit {

  constructor() { }

  @Input() size: string = '';

  ngOnInit(): void {
  }

}
