const express = require('express');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', indexRouter);
app.listen(() => {
  console.log(`Listening on port 3000`);
});

module.exports = app;
