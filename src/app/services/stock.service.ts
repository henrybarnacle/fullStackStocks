import { Stock, StockHistory } from '../models/Stock';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import './rxjs-operators';

@Injectable()

export class StockService {
stock: Stock;
stockHistory: StockHistory;
token = 'pk_14ff5b2da8d34d95add9a14592bb4ea6';
updateStockDetail: Observable<any>;
stockDetail: BehaviorSubject<{}>;


constructor(private http: Http) {
  this.stockDetail = new BehaviorSubject({});
  this.updateStockDetail = this.stockDetail.asObservable();
 }

getData(code: string): Observable<Stock> {
console.log(code);
let stockUrl = `https://cloud.iexapis.com/stable/stock/${code}/quote/?token=${this.token}`;

	return this.http.get(stockUrl)
		.map(this.extractData)
		.catch(this.handleError);
	}

  private extractData(res: Response) {
console.log(res);
    const body = res.json();
    this.stock = new Stock();
    this.stock.companyName = body.companyName;
    this.stock.code = body.symbol;
    this.stock.latestTime = body.latestTime;
    this.stock.date = new Date();
    this.stock.open = (body.iexRealtimePrice !== null) ? body.iexRealtimePrice : body.latestPrice;
    this.stock.latestPrice = (body.iexRealtimePrice !== null) ? body.iexRealtimePrice : body.latestPrice;
    this.stock.week52High = body.week52High;
    this.stock.week52Low = body.week52Low;
    this.stock.primaryExchange = body.primaryExchange;
    this.stock.sector = null;
    this.stock.peRatio = body.peRatio;
    this.stock.avgTotalVolume = body.avgTotalVolume;
    this.stock.currentPrice = (body.iexRealtimePrice !== null) ? body.iexRealtimePrice : body.latestPrice;

    return this.stock;
  }

  setDetailView(obj) {
  console.log(obj);
    this.stockDetail.next(obj);
  }

  getStockPriceHistory(code: string): Observable<any> {
  const stockHistoryURL = `https://cloud.iexapis.com/beta/stock/${code}/chart/1y?token=${this.token}`;
  return this.http.get(stockHistoryURL)
      .map(this.extractHistoryData);
  }

    private extractHistoryData(res) {
      const body = res.json();
      this.stockHistory = new StockHistory();
      this.stockHistory.day = body[body.length-1].close;
      this.stockHistory.week = body[body.length-7].close;
      this.stockHistory.month = body[body.length-20].close;
      this.stockHistory.year = body[0].close;

    return this.stockHistory;
  }



   private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server   error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
    }

}














