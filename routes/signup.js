var express= require ('express')
var router = express.Router()
var passport= require('passport')

var User = require('../models/user')

require('../config/passport')(passport)

router.get('/', function (req, res){
  res.render('signup', {message: req.flash('signupMessage')})
})

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/profile',
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
