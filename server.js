// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.set("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})



app.get('/:time', function (req, res) {
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

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
