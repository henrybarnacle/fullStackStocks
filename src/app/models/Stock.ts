
export class Stock {
	code: string;
	companyName: string;
	latestTime: string;
	open: number;
	date: any;
    latestPrice: number;
    week52High: number; 
    week52Low: number;
    primaryExchange: string; 
    sector: string; 
    peRatio: number;
    avgTotalVolume: number;
    user: string;
    currentPrice: number;
}

export class StockHistory {
    day: number;
    week: number;
    month: number;
    year: number;
}
