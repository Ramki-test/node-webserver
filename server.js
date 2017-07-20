'use strict';

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var PORT = 8800;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('./logs/server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to write to file');
    }
  });

  next();
});

app.use ((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Under Maintenance'
  });
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.send({
    name: 'Ramki',
    likes: ['Football', 'Movies']
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Me Page'
  });
});

app.get('/home', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'My Home Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: "Unable to deliver page"
  });
});

app.listen(PORT); 