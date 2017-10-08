var express = require('express');
var router = express.Router();
var products = require('../models/products');
var multer = require('multer'); //require multer(coipied and pasted)

router.get('/create', function(req, res, next) {
	res.render('product/create', {title: 'User Image Create', nav: 'Create'})
});

router.post('/create', function(req, res, next) {
	res.send('TODO');
});

router.get('/:id', function(req, res, next) {
	var product = products.findById(req.params.id);
	res.render('product/show', {product: product, title: 'Product Details', nav: 'Product'})
});


// routes/products.js
var myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/images/user-images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
} });


//routes/products.js
var requestHandler = multer({ storage: myStorage });
router.post('/create', requestHandler.single('productImage'), function(req, res, next) {
});


router.post('/create', requestHandler.single('productImage'), function(req, res, next) {
    products.addProduct(req.body, req.file.filename)
    res.redirect('/');
});

module.exports = router;
