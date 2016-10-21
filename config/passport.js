
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

//define user!
module.exports = function (passport){
  passport.serializeUser(function(user, done){
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
    done(err, user)
      })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'newUser[local][email]',
    passwordField: 'newUser[local][password]',
    passReqToCallback: true
  }, function(req, email, password, next){
    //the authentication flow on our local auth routes
    console.log(email)
    User.findOne({'local.email': email}, function (err, foundUser){
      //if user is found, don't create new user

      //if user not found,create new user

      if(err) return next (err)

      if (foundUser) {
        return next(null,false, req.flash('signupMessage', 'Email has been taken'))
      } else {

        User.create(req.body.newUser, function (err, user){
          if (err) throw err
          else {
            console.log(req.body.newUser)
            return next(null, user)
          }
        })

        // var newUser = new User({
        //   local: {
        //     name: req.body.user.local.name,
        //     email: email,
        //     password: password
        //   }
        // })
        //
        // newUser.save(function(err, newUser){
        //   if (err) throw err
        // })
      }

    })
  }))
}

// can only take two fields (choose username or email)
