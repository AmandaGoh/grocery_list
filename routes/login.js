var express = require ('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var passport = require('passport')

var User = require('../models/user')
require('../config/passport')(passport)

router.get('/', function (req, res){
  res.render('login', {message: req.flash('errMessage')})
})

//LINK POST TO PASSPORT TO OPEN SESSIONS
router.post('/', passport.authenticate('local-login', {
  successRedirect: '/login/profile',
  failureRedirect: '/login',
  failureFlash: true
}))

// router.post('/', function (req, res){
//   var post_name = req.body.user.local.name
//
//   var userLogIn = req.body.user
//
//   var user = User.findOne({
//     'local.name': post_name
//   }, function (err, foundUser){
//     // console.log('foundUser: ', foundUser)
//     if (err) res.send(err)
//
//     if (foundUser) {
//       var savedPassword = foundUser.local.password
//
//         foundUser.authenticate(userLogIn.local.password, savedPassword, function(err, testauth){
//           if (err)
//           console.log('not authenticated')
//           console.log('auth is' + testauth)
//           if (testauth) {res.redirect('/profile')}
//           else {
//             req.flash('errMessage', 'Incorrect Password')
//             res.redirect('/login')
//           }
//           // console.log('user is authenticated')
//         })
//       } else {
//         req.flash('errMessage', 'User not found. Create an account through link below!')
//         res.redirect('/login')
//       }
//   })
// })

router.get('/profile', function (req, res){
  res.render('profile', {message: req.flash('loginMessage' || 'logoutMessage')})
})


module.exports = router
