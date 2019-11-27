import { Stock } from '../models/Stock';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import './rxjs-operators';

@Injectable()

export class StockService {
stock: Stock;
token = 'pk_14ff5b2da8d34d95add9a14592bb4ea6';

constructor(private http: Http) { }



  getData(code: string): Observable<Stock> {
    const stockUrl = `https://cloud.iexapis.com/stable/stock/${code}/quote?token=${this.token}`;
    return this.http.get(stockUrl)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    this.stock = new Stock();
    this.stock.companyName = body.companyName;
    this.stock.code = body.symbol;
    this.stock.latestTime = body.latestTime;
    this.stock.date = null;
    this.stock.open = body.delayedPrice;
    this.stock.latestPrice = body.iexRealtimePrice;
    this.stock.week52High = body.week52High;
    this.stock.week52Low = body.week52Low;
    this.stock.primaryExchange = body.primaryExchange;
    this.stock.sector = null;
    this.stock.peRatio = body.peRatio;
    this.stock.avgTotalVolume = body.avgTotalVolume;

    return this.stock;
}



  private handleError(error: any) {
  const errMsg = (error.message) ? error.message :
  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return Observable.throw(errMsg);
  }

}









