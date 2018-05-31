var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Stock = require('../models/Stock.js');
const passport = require('passport');
const { ensureAuthenticated } = require('../helpers/auth');



/* GET ALL STOCKS */
router.get('/',ensureAuthenticated, (req, res, next) => {
  Stock.find({user: req.user.id}, (err, products) => {
    if (err) return next(err);
    
    res.json(products);
  });
});



/* GET SINGLE STOCK BY ID */
router.get('/:id', function(req, res, next) {
  Stock.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE STOCK */
router.post('/', function(req, res, next) {
  Stock.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE STOCK */
router.put('/:id', function(req, res, next) {
  Stock.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE STOCK */
router.delete('/:id', function(req, res, next) {
  Stock.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;