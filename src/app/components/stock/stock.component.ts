import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { StockService } from '../../services/stock.service';
import { Stock, StockHistory } from '../../models/Stock';


declare var $: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [ StockService]
  
})

export class StockComponent {
	stock: Stock;
	user: any;
	private errorMessage: any = '';
  currentStock: boolean = false;
  stockHistory: StockHistory;

	

  constructor(private authService: AuthService, private stockService: StockService, private http: Http, private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {
      this.setStockInitialValues();
      this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      
      console.log(this.user);
      
    },
     err => {
       console.log(err);
       return false;
     });

  }
setStockInitialValues() {
  this.stock = {
    code: '',
    companyName: '',
    latestTime: '',
    open: null,
    date: '',
    latestPrice: null,
    week52High: null, 
    week52Low: null,
    primaryExchange: '',
    sector: '',
    peRatio: null,
    avgTotalVolume: null,
    user: '',
    currentPrice: null
  };
  this.stockHistory = {
    day: null,
    week: null,
    month: null,
    year: null
  }
}

getStock(code: string) {
this.getStockHistory(code);
	this.stockService.getData(code)
	.subscribe(
	response => { 
	this.stock = response;
  this.currentStock = true;
		});
	}

  getStockHistory(code: string) {
  this.stockService.getStockPriceHistory(code)
  .subscribe( history => {
  this.stockHistory.day = history.day;
  this.stockHistory.week = history.week;
  this.stockHistory.month = history.month;
  this.stockHistory.year = history.year;

  })
  }

saveStock(code: string) {
this.stock.user = this.user._id;
this._flashMessagesService.show('Stock added to Portfolio' , {
        cssClass:'alert-success', timeout: 4000
      });

    this.http.post('/stock', this.stock)
      .subscribe(res => {
          let id = res['_id'];
        }, (err) => {
        }
      );

  }

  ngAfterViewChecked() {
    $("h2:contains('-')").addClass('red').removeClass('green');
    $("h2:not(:contains('-'))").addClass('green').removeClass('red');

  }

}
