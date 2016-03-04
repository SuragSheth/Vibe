// var admin       = require('../controllers/admin.js');
// var businesses  = require('../controllers/businesses.js');
var Studio = require('./../controllers/Studios.js');
var Artist = require('./../controllers/Artists.js');
var Session = require('./../controllers/Sessions.js')
var mongoose = require('mongoose');
var Passport = require('passport')
var User = mongoose.model('User');
var UserController = require('./../controllers/User.js')
// var Studio = mongoose.model('Studio');
// var User = mongoose.model('User');
var jwt = require('express-jwt');
module.exports = function(app, passport) {

    var urlencodedParser = bodyParser.urlencoded({ extended: false })
}


var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


//
module.exports = function(app, passport, client) {

//-------------------- AUTHENTICATION / LOGIN / SIGNUP ROUTES : START  ----------------//
app.post('/register', function(req, res, next) {
	console.log(req.body, "OMG WE MADE It")
	if(!req.body.email || !req.body.password) {
		return res.status(400).json({message: 'Please fill out all fields'})
	}

	var user = new User();
	console.log(user)
	user.username = req.body.userName;
	console.log(user)
	user.email = req.body.email
	user.setPassword(req.body.password)
	user.profileType = ""
	console.log(user, "WE GON MAKE IT HAPPEN")
	user.save(function(err, saved){
		if(err){return next (err)}
			return res.json({token: user.generateJWT(), user: saved})
	})
});


app.post('/loginUser', function(req, res, next) {
	console.log(req.body)

	if (!req.body.userName || !req.body.password) {
		console.log('nice try buddy_______')
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	var user = req.body
	user.username = req.body.userName
	Passport.authenticate('local', function(err, user, info){
		if(err){
			console.log('nah bro')
			return next(err);}

		if (user){
			return res.json({token: user.generateJWT(), user: user});
		} else {
			console.log(info, "sorry mate")
			return res.status(401).json(info);
		}
	})(req, res, next);
});

app.post("/updateProfile", function(req, res){
	console.log(req.body, "going futher");
	UserController.updateProfile(req, res)
})

app.post("/getUserInfo", function(req, res){
	console.log(req.body, "going futher than ever before");
	UserController.findSessions(req , res)
})

app.post("/findStudios", function(req, res){
	console.log(req.body, "searching for the user")
	UserController.findStudios(req, res)
})

app.post("/findStudiosSimple", function(req, res){
	console.log(req.body, "searching for the user")
	UserController.findStudiosSimple(req, res)
})


//------------FOR SESSIONS
    app.post('/addSession', function(req, res){
    Session.create(req, res)
	})

	app.post("/getSessions", function(req, res) {
		console.log("off to controler", req.body.studio)
	    Studio.findSessions(req, res)
	})


};
