import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockService } from './services/stock.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StockService, HttpClient, ]

})
export class AppComponent {
  title = 'app';

  
  constructor() {

  }

}
