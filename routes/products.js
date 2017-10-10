var express = require('express');
var router = express.Router();
var products = require('../models/products');
var multer = require('multer');
var sharp = require('sharp');

router.get('/create', function(req, res, next) {
  res.render('product/create', {
    title: 'User Image Create',
    nav: 'Create'
  });
});

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  var product = products.findById(req.params.id);
  res.render('product/show', {
    product: product,
    title: 'Product Details',
    nav: 'Product'
  });
});

var myStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/../public/images/user-images');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
});

var requestHandler = multer({
  storage: myStorage
});

router.post('/create', requestHandler.single('productImage'), function(req, res, next) {

  sharp(__dirname + '/../public/images/user-images/' + req.file.filename)
    .ignoreAspectRatio()
    .resize(100, 100)
    .toFile(__dirname + '/../public/images/user-images/thumbnails/' + req.file.filename, function(err, info) {
      products.addProduct(req.body, req.file.filename);
      res.redirect('/');
    });
  next();
});

module.exports = router;
