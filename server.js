var express 		= require("express");
var	app 				= express();
var	bodyParser 	= require("body-parser");
var	path 				= require("path");
var	mongoose 		= require("mongoose");
var flash 				= require('connect-flash');
var morgan 				= require('morgan');
var cookieParser 	= require('cookie-parser');
var session 			= require('express-session');
<<<<<<< HEAD
var _ = require("underscore");
=======
>>>>>>> b5480aae2259c473d9284f0478d9dacc100fbff3
var passport = require('./server/config/passport.js');

// require('angular')
('./server/config/mongoose.js');

<<<<<<< HEAD
=======
require('./server/config/mongoose.js');

>>>>>>> b5480aae2259c473d9284f0478d9dacc100fbff3
app.use(express.static(path.join(__dirname, "./client")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev')); //logs every request to console
app.use(cookieParser()); //read cookies (needed for auth)

var passport = require('./server/config/passport.js');

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var hostname = process.env.HOSTNAME || 'localhost', port = 8080;
console.log("Simple static server listening at http://" + hostname + ":" + port);
var server = app.listen(port, hostname);
require('./server/config/routes.js')(app, passport);
