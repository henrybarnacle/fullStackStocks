import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { StockService } from '../../services/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';





declare var $: any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  providers: [StockService]
})
export class PortfolioComponent implements OnInit { 

user:any;

stocks: any;
response: any;


  constructor( private authService:AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private stockService: StockService, private _flashMessagesService: FlashMessagesService){

}


  ngOnInit() {
      this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
      this.showPortfolio();

      
    },
     err => {
       console.log(err);
       return false;
     });
	 
  }

showPortfolio() { 
    	this.http.get('/stock').subscribe(data =>  {
  		this.stocks = data;

  		for (let i of this.stocks) {
  			let code = i.code;
  			this.getPrice(code, function(response) { 
  				i.currentPrice = response;
  			});
  			
  			console.log(i);

  			}
  		});
  		}
getPrice(code, callback) {
  		this.stockService.getData(code)
		.subscribe(
		response => { 
		this.response = response.open;
		
		console.log(this.response);
		callback(response.open);
			});
  		}



   ngAfterViewChecked() {
    	$("tbody>tr:contains('-')").addClass('red').removeClass('green');
		$("tbody>tr:not(:contains('-'))").addClass('green').removeClass('red');

		}
  }


