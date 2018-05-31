import { Stock } from '../models/Stock';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject'; 
import './rxjs-operators';

@Injectable()

export class StockService {
stock: Stock;


constructor(private http: Http) { }



getData(code: string): Observable<Stock> {

let stockUrl = `https://api.iextrading.com/1.0/stock/${code}/batch?types=quote,news,chart&range=1m&last=10`;

	return this.http.get(stockUrl)
		.map(this.extractData)
		.catch(this.handleError);
	}
	    private extractData(res: Response) {
      let body = res.json();
      console.log(body);
      this.stock = new Stock();
      this.stock.companyName = body.quote.companyName;
      this.stock.code = body.quote.symbol;
      this.stock.latestTime = body.quote.latestTime;
      this.stock.date = body.news[0].datetime;
      this.stock.open = body.quote.delayedPrice;
      this.stock.latestPrice = body.quote.latestPrice;
      this.stock.week52High = body.quote.week52High;
      this.stock.week52Low = body.quote.week52Low;
      this.stock.primaryExchange = body.quote.primaryExchange;
      this.stock.sector = body.quote.sector;
      this.stock.peRatio = body.quote.peRatio;
      this.stock.avgTotalVolume = body.quote.avgTotalVolume;

      return this.stock;


    }

 

        private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server   error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

}



  
  
    








