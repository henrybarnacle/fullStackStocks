import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StockDetailComponent implements OnInit {

  stock = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getStockDetail(this.route.snapshot.params['id']);
  }

  getStockDetail(id) {
    this.http.get('/stock/'+id).subscribe(data => {
      this.stock = data;
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