var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')
var GroceryList = require('../models/grocery_list')

// define user!
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'newUser[local][email]',
    passwordField: 'newUser[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    // the authentication flow on our local auth routes
    User.findOne({'local.email': email}, function (err, foundUser) {
      if (err) return next(err)

      if (foundUser) {
        return next(null, false, req.flash('errMessage', 'Email has been taken'))
      } else {
        var groceryListName = req.body.newGroceryList.name

        var userEmail = req.body.user.local.email

        // referencing for joining someone's list
        if (groceryListName.length === 0 && userEmail.length !== 0) {
          User.findOne({'local.email': req.body.user.local.email}, function (err, user) {
            // console.log(user.local.groceryListID)
            var newUser = new User({
              local: {
                name: req.body.newUser.local.name,
                email: email,
                password: password,
                groceryListID: [user.local.groceryListID]
              }
            })
            newUser.save(function (err, newUser) {
              GroceryList.findById(user.local.groceryListID, function (err, groceryList) {
                // console.log(newUser._id)
                groceryList.user_ids.push(newUser._id)
                groceryList.save()
              })
              return next(null, newUser)
            })
          })
        // create new user with new grocery list
        } else {
          var newGroceryList = new GroceryList({
            name: groceryListName,
            items: ['', '', '', '', '', '', '', '', '', '']
          })

          newGroceryList.save(function (err, newList) {
            if (err) next(err)
            var newGroceryListID = newGroceryList._id
            var newUser = new User({
              local: {
                name: req.body.newUser.local.name,
                email: email,
                password: password,
                groceryListID: [newGroceryListID]
              }
            })
            newUser.save(function (err, newUser) {
              GroceryList.findById(newGroceryListID, function (err, groceryList) {
                groceryList.user_ids.push(newUser._id)
                groceryList.save()
              })
              return next(null, newUser)
            })
          })
        }
      }
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[local][email]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function (req, email, password, next) {
    // console.log('authenticating login')

    User.findOne({'local.email': email}, function (err, foundUser) {
      if (err) return next(err)

      if (!foundUser) {
        return next(null, false, req.flash('errMessage', 'User not found. Have you created an account yet?'))
      } else {
        foundUser.authenticate(password, function (err, authenticated) {
          if (err) return next(err)

          if (authenticated) {
            return next(null, foundUser, req.flash('loginMessage', 'What are you missing today ' + foundUser.local.name + '?'))
          } else {
            return next(null, false, req.flash('errMessage', "Passwords don't match"))
          }
        })
      }
    })
  }))
}
