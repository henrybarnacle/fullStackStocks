import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/Stock';


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

	

  constructor(private authService: AuthService, private stockService: StockService, private http: Http, private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {
      this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
      
    },
     err => {
       console.log(err);
       return false;
     });

  }


getStock(code: string) {
	this.stockService.getData(code)
	.subscribe(
	response => { 
	this.stock = response;
	console.log(this.stock);
		});
	}

saveStock( code: string) {
this.stock.user = this.user._id;
this._flashMessagesService.show('Stock added to Portfolio' , {
        cssClass:'alert-success', timeout: 4000
      });

    this.http.post('/stock', this.stock)
      .subscribe(res => {
          let id = res['_id'];
        }, (err) => {
          console.log(err);
        }
      );

  }

}
