var express= require ('express')
var router = express.Router()

var User = require('../models/user')

router.get('/', function (req, res){
  res.render('signup')
})

router.post('/', function (req, res) {
  // passport.authenticate('local-login', function (err, user, info){
  // 
  // })
  User.create(req.body.newUser, function (err, user){
    if (err) throw err
    else {
      res.redirect('/signup')
    }
  })
})

module.exports = router
