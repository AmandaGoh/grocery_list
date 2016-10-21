var express= require ('express')
var router = express.Router()
var passport= require('passport')

var User = require('../models/user')

require('../config/passport')(passport)

function authCheck (req, res, next) {
  if (req.isAuthenticated()){
    req.flash('signupMessage', 'You are already logged in, log out first to sign up for a new account')
    return res.redirect('/login/profile')
  } else {
    return next()
  }
}

router.get('/', authCheck, function (req, res){
  res.render('signup', {message: req.flash('signupMessage')})
})

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/login/profile',
  failureRedirect: '/signup',
  failureFlash: true
}
))


  // User.create(req.body.newUser, function (err, user){
  //   if (err) throw err
  //   else {
  //     res.redirect('/signup')
  //   }
  // })

module.exports = router
