var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('asdf')
  res.render('index.html');
});

/* GET about page */
router.get('/about', (req, res) => {
  res.render('about.html')
})

module.exports = router;
