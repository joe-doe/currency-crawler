var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get(req.config.get('collection_usd'));
  
  collection.find({}, {}, function(e, docs){
    res.render('index', { title: 'EUR / USD', content: docs });
  });

});

module.exports = router;
