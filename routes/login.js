var express = require ('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var passport = require('passport')

var User = require('../models/user')
require('../config/passport')(passport)

function authCheck (req, res, next ) {
  if (req.isAuthenticated()){
    req.flash('logoutMessage', 'You are already logged in!')
    return res.redirect('/login/profile')
  } else {
    return next()
  }
}

router.get('/', authCheck, function (req, res){
  res.render('login', {message: req.flash('errMessage')})
})

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/login/profile',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/profile', function (req, res){
  res.render('profile', {message: req.flash('logoutMessage')})
})


module.exports = router
