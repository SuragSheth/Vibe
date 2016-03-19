var mongoose = require('mongoose');
var Session = mongoose.model('Session');
var User = mongoose.model('User');
//
// var Paypal = require('paypal-adaptive');
// var paypalSdk = new Paypal({
//     userId:    'christian.anchors-facilitator_api1.gmail.com',
//     password:  'T9J6T6DANU4XU3EB',
//     signature: 'AYZv5UZKLzSPZ.oyEgmdtB4L0fp.AIXb6UPjbpeoxudQ9KDSEkB0EdcJ',
//     sandbox:   true //defaults to false
// });

module.exports = (function(){
	return {
		//this will grab all questions to select for quiz
		show: function(req, res){
			Session.find({_studio: req.body.studio})
            .populate('sessions')
            .exec( function(err, studio){
				//find all Orders
				if (err){
					console.log(err)
				}
				else{
					 console.log("YEAS WE GOT ", studio)
					res.send(JSON.stringify(studio.sessions));
				}
			})
		},

		create: function(req, res){
            //req.body is the session
            console.log("begining the add!", req.body)
			User.findOne({_id: req.body.studio}, function(err, studio){
                if (err){
                    console.log(err)
                } else {
                    console.log('found', studio ,'~~~~~~~~~~~')
                    User.findOne({username: req.body.artist}, function(err, artist){
                        if (err){
                            console.log(err)
                        } else {
                            var session = new Session({
                                startsAt: req.body.startTime,
               				 endsAt: req.body.endTime,
               				 startHour: req.body.startHour,
               				 endHour: req.body.endHour,
               				 type: "info",
               				 info: req.body.info,
               				 artist: req.body.artist,
               				 title: req.body.artist,
               				 deletable: true,
							 studioName: studio.username
               			 });

                         console.log(session, 'IS ABOUT TO BE SAVED')
               			 session._studio = studio._id
                         session._user = artist._id
                         console.log(studio)
               			 studio.sessions.push(session)
                         artist.sessions.push(session)
               			 //add the new session
                         console.log(studio, "IS THE STUDIO GETTING ADDED")
                         console.log(artist, "IS THE Artist getting added into")
                         console.log(session, "IS NOW UPDATED CHECK IT OUUUUUUT")
               			 session.save(function(err, session){
                             if (err){
                                 console.log(err)
                             } else {
                                 studio.save(function(err, all){
                                     if (err) {
                                         console.log(err) }
                                         else {
                                             artist.save(function(err, everything){
                                                 if(err){
                                			 		console.log(er)
                                			 	}
                                			 	else{
                                			 		console.log(everything, "is getting sent back")
                                			 		res.send(JSON.stringify(session));
                                			 	}
                                             })

                                         }

                    			 	})

                             }
               			 })
                        }
                    })
                }
			})
		},

		deleteSession: function(req, res){
			Session.remove({_id: req.body.event._id}, function(err, userFound){
				if (err){
					console.log(err)
				} else {
					User
						.findOne({_id: req.body.user.id})
						.populate("sessions")
						.exec(function (err, foundUser){
					 	if(err){
					 		console.log(err)
					 	}
					 	else{
					 		console.log(foundUser, "back at it again")
					 		res.send(JSON.stringify(foundUser));
					 	}
					 })
				}
			})
		}
	}
}) ()
