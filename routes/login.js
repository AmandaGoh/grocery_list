var express = require ('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var passport = require('passport')

var User = require('../models/user')
var GroceryList = require('../models/grocery_list')
require('../config/passport')(passport)


//how to redirect to user's page?
function authCheck (req, res, next ) {
  if (req.isAuthenticated()){
    req.flash('logoutMessage', 'You are already logged in!')
    return res.redirect('/login/profile/' + req.user.local.groceryListID)
  } else {
    return next()
  }
}

router.get('/', authCheck, function (req, res){
  res.render('login', {message: req.flash('errMessage')})
})

router.post('/', function (req, res, next){
  passport.authenticate('local-login', function (err, user, info){
    if (err) {return next (err)}
    if (!user) {return res.redirect('/login')}
    req.logIn(user, {session: true}, function (err){
      // console.log(user)
      if (err) {return next (err)}
      return res.redirect('/login/profile/' + user.local.groceryListID[0])
    })
  // successRedirect: '/login/profile',
  // failureRedirect: '/login',
  // failureFlash: true
  })(req,res,next)
})

router.get('/profile/:id', function (req, res){
  // console.log(req.user)

  var id = req.params.id
  if (id === ':id') {
     res.render('profile', {message : req.flash('logoutMessage')})
  } else {
    GroceryList.findById(id, function(err, groceryList){
      // console.log(groceryList)
      if (err) return (err)
      return res.render('profile', ({
        groceryList : groceryList,
        message: req.flash('logoutMessage')
      }))
    })
  }

})


module.exports = router
