
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
    // console.log(email)
    User.findOne({'local.email': email}, function (err, foundUser){
      //if user is found, don't create new user

      //if user not found,create new user

      if(err) return next (err)

      if (foundUser) {
        return next(null,false, req.flash('errMessage', 'Email has been taken'))
      } else {

        User.create(req.body.newUser, function (err, user){
          if (err) throw err
          else {
            console.log(req.body.newUser)
            return next(null, user)
          }
        })
      }
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function(req, email, password, next){
    console.log('authenticating login')

    User.findOne({'local.email': email}, function (err, foundUser){

      if(err) return next (err)

      if (!foundUser) {
        return next(null,false, req.flash('errMessage', 'User not found. Have you created an account yet?'))
      }

      foundUser.authenticate(password, function (err, authenticated){
        if (err) return next (err)

        if (authenticated){
          return next(null, foundUser, req.flash('loginMessage', 'What are you missing today ' + foundUser.local.name + '?'))
        } else {
          return next(null, false, req.flash('errMessage', 'Passwords don\'t match'))
        }
      })


    })


  }))
}

// can only take two fields (choose username or email)
