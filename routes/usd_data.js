var express = require('express');
var router = express.Router();

/* GET data in JSON. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get(req.config.get('collection_usd'));
  
  collection.find({}, {limit: 20}, function(e, docs){
    res.json(docs);
  });

});

module.exports = router;
