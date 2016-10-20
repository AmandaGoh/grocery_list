var passport = require ('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

passport.serializeUser((user, done), function(){
  done(null, user.id)
})

passport.deserializeUser(function(){
  User.findById(id, function(err, user){
    done(err, user)
  })
})

passport.use('local-login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, name,password,next){
  //the authentication flow on our local auth routes

  User.findOne({'local.name': name}, function (err, foundUser){
    //if user is found, don't create new user

    //if user not found,create new user

    if(err) return next (err)

    if (foundUser) {
      return next(null,false, req.flash('signupMessage', 'Name has been taken'))
    } else {
      var newUser = new User({
        local: {
          name: name,
          password: password
        }
      })


    }

  })
}))
