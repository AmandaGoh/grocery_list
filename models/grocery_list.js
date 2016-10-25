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
      // itemOne: {
      //   name: String,
      //   quantity: Number
      // },
      // itemTwo: {
      //   name: String,
      //   quantity: Number
      // },
      // itemThree: {
      //   name: String,
      //   quantity: Number
      // },
      // user_ids: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'User'
      //   }
      // ]
      time: {
        type: Date,
        default: Date.now
      }

},{
  timestamps: {}
})

//
// grocery_1 = {
//   local: {
//     name: 'List 1',
//     itemOne: {
//       name: 'Test',
//       quantity: 32
//     },
//     user_ids: [ userid1, userid2 ]
//   }
// }

// if(req.user === grocery_1.user_ids)

var GroceryList = mongoose.model('Grocery_List', groceryListSchema)

module.exports = GroceryList
