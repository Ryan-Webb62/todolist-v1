//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const date = require(__dirname + '/date.js');
const userTasks = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  
  const day = date.getDate();
  
  res.render('list', {
    listTitle: day,
    userTasks: userTasks,
  });
});

app.post('/', function (req, res) {
  const item = req.body.taskTextInput;

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    userTasks.push(item);
    res.redirect('/');
  }
});

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', userTasks: workItems });
});

app.get('/about', function(req, res){
  res.render('about');
});

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
