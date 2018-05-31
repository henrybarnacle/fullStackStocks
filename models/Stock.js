var mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
	user: String,
	code: String,
	companyName: String,
	latestTime: String,
	open: Number,
	date: String,
    latestPrice: Number,
    week52High: Number,
    week52Low: Number,
    primaryExchange: String,
    sector: String,
    peRatio: Number,
    avgTotalVolume: Number


});

module.exports = mongoose.model('Stock', StockSchema );