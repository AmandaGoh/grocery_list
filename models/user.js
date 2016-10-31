var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var GroceryList = require('./grocery_list')

var userSchema = mongoose.Schema ({
  local: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: [5, 'Password should be greater than 5 characters']
    },
    groceryListID: [{
      type: mongoose.Schema.Types.ObjectId
    }]
  }
})

userSchema.pre('save', function (next) {
  var user = this

  bcrypt.genSalt(5, function(err, salt) {
    if(err) return next (err)

    bcrypt.hash(user.local.password, salt, function(err, hash){
      if (err) return next (err)

      user.local.password = hash
      // console.log(user)
      next()
    })
  })
})


userSchema.methods.authenticate = function (givenPassword, callback){

  var savedPassword = this.local.password
  console.log(savedPassword)
  bcrypt.compare(givenPassword, savedPassword, function (err, isMatch){
    callback (err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
