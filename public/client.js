// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {  // we don't need next (callback) in this challange
  res.render('index');
});

router.get('/:time', function (req, res) {
  function unixToNatural(unix) {
    var date = new Date(unix * 1000); // milliseconds
    var months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    };

    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    var result = month + ' ' + day + ', ' + year;
    return result;
  }

  if (!isNaN(req.params.time)) {
    var naturalDate = unixToNatural(req.params.time); // seconds
    var answer1 = { unix: req.params.time, natural: naturalDate };
    res.json(answer1);
  } else {
    var naturalDateToUnix = new Date(req.params.time); // should be in milliseconds
    if (!isNaN(naturalDateToUnix)) {
      var unix = naturalDateToUnix / 1000; // seconds
      var answer2 = { unix: unix, natural: req.params.time };
      res.json(answer2);
    } else {
      res.json({ unix: null, natural: null });
    }
  }
});

module.exports = router;
