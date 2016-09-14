var express = require('express');
var router = express.Router();
var cors = require('cors');

/* GET data in JSON. */
router.get('/', cors(), function(req, res, next) {
  var db = req.db;
  var collection = db.get(req.config.get('collection_usd'));
  
  collection.find({}, {}, function(e, docs){
    res.json(docs);
  });

});

module.exports = router;
