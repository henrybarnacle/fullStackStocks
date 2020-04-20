import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StockDetailComponent implements OnInit {

  stock = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private stockService: StockService) { }

  ngOnInit() {
    this.getStockDetail(this.route.snapshot.params['id']);
  }

  getStockDetail(id: string) {
    this.stockService.getData(id)
    .subscribe(
    response => {
    this.stock = response;
      });
    }


 deleteStock(id) {
  this.http.delete('/stock/'+id)
    .subscribe(res => {
        this.router.navigate(['/stocks']);
      }, (err) => {
        console.log(err);
      }
    );
}
}
