// require Express
var express = require('express');
//path module -- try to figure out where and why we use This
var path = require('path');
//create the express app
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
var jquery = require('jquery');

var app = express();
//use it

app.use(bodyParser.urlencoded({ extended: true }));
//static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//root route to render the index.ejs view

// Use the session middleware

//++++++++++++++COUNTER BELOW++++++++++++++++++++++++++++++++++

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

// Access the session as req.session
app.get('/', function(req, res, next) {
    console.log(req.session);
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    console.log(req.session);
    res.end();
  }
  else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})


//++++++++++++++COUNTER ABOVE++++++++++++++++++++++++++++++++++
//
// app.get('/add2', function(req, res, next) {
//     console.log(req.session);
//   if (req.session.views) {
//     res.write('<button id="b1">Add 2 </button>')
//     var b1Clicked = '#b1'.click()
//     if(b1Clicked === true){
//         req.session.views+=2;
//         res.write(req.session.views);
//     }
//     else{
//         req.session.views = 1;
//         res.end('welcome to add2 page demo')
//     }
//     console.log(req.session);
//   }
//   else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })




app.get('/add2', function (req, res, next) {
  // Update views

  requestingSession = (req.session.views || 0) + 2;

  res.render("add2.ejs");
  // Write response
  // res.end(req.session.views + ' views')
})

app.post('/add2', function(req, res){
    console.log("POST DATA", req.body);
    res.redirect('/add2.ejs');
})

app.listen(3000)



//post route for adding a user
app.post('/users', function(req, res){
    console.log("POST DATA", req.body);

    console.log(users);
    //This is where we would add the user to the database
    //Then redirect to the root routes
    res.redirect('/');
})

app.listen(8000, function(){
    console.log("8000");
})
