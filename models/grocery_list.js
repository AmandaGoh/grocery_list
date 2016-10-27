var mongoose = require('mongoose')
var User = require('../models/user')

var groceryListSchema = mongoose.Schema ({
      name: String,
      items: [{
          name: String,
          quantity: Number
      }],
      user_ids:  [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }] ,

      time: {
        type: Date,
        default: Date.now
      }

},{
  timestamps: {}
})


var GroceryList = mongoose.model('Grocery_List', groceryListSchema)

module.exports = GroceryList
