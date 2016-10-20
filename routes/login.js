var express = require ('express')
var router = express.Router()
var bcrypt = require('bcrypt')

var User = require('../models/user')

router.get('/', function (req, res){
  res.redirect('/login')
})

router.get('/login', function (req, res){
  res.render('login', {message: req.flash('errMessage')})
})

router.post('/login', function (req, res){
  var post_name = req.body.user.local.name
  // var post_pw = req.body.newUser.local.password

  var userLogIn = req.body.user

  var user = User.findOne({
    'local.name': post_name
  }, function (err, foundUser){
    // console.log('foundUser: ', foundUser)
    if (err) res.send(err)

    if (foundUser) {
      var savedPassword = foundUser.local.password

        foundUser.authenticate(userLogIn.local.password, savedPassword, function(err, testauth){
          if (err)
          console.log('not authenticated')
          console.log('auth is' + testauth)
          if (testauth) {res.redirect('/profile')}
          else {
            req.flash('errMessage', 'Incorrect Password')
            res.redirect('/login')
          }
          // console.log('user is authenticated')
        })
      } else {
        req.flash('errMessage', 'User not found. Create an account through link below!')
        res.redirect('/login')
      }
  })



  // console.log(savedPassword)

  // var userLogIn = User.find

  //  ({
  //   local : {
  //     name: post_name,
  //     log_in_password: post_pw,
  //     // password: savedPassword
  //   }
  // })

  // console.log(userLogIn.local.password)
  // userLogIn.save(function (err, user){
    // if (err) console.log(err.message)
  // })

})


module.exports = router
