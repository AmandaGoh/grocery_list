var express= require ('express')
var router = express.Router()
var passport= require('passport')

require('../config/passport')(passport)

function authCheck (req, res, next) {
  if (req.isAuthenticated()){
    req.flash('logoutMessage', 'You are already logged in, log out first to sign up for a new account')
    return res.redirect('/login/profile/' + req.user.local.groceryListID)
  } else {
    return next()
  }
}

router.get('/', authCheck, function (req, res){
  res.render('signup', {message: req.flash('errMessage')})
})

router.post('/', function (req, res, next) {
  passport.authenticate('local-signup' , function (err, user, info){
    if (err) {return next (err) }
    if (!user) { return res.redirect ('/signup') }
    req.logIn(user, { session: true }, function (err){
      if (err) {return next (err)}
      return res.redirect('/login/profile/' + user.local.groceryListID[0])
    })
    // successRedirect: '/login/profile',
    // failureRedirect: '/signup',
    // failureFlash: true
  })(req,res,next)
})


module.exports = router
