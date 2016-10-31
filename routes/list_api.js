var express = require('express')
var router = express.Router()

var groceryList = require('../models/grocery_list')
var User= require('../models/user')

router.post('/new', function (req,res){
  var listName = req.body.newGroceryList.name

  console.log(req.user.id)

  if(listName.length > 0) {
    var newGroceryList = new groceryList({
      name: listName,
      items: ['','','','','','','','','',''],
      user_ids: [req.user.id]
    })
    newGroceryList.save(function (err, newList){
      if(err) throw (err)
      var newGroceryListID = newGroceryList._id
      User.findById(req.user.id, function(err, user){
        user.local.groceryListID.push(newGroceryList._id)
        user.save()
      })
      res.send('new grocery list created')
    })
  }

})

router.post('/:id', function (req, res) {
  var itemName = req.body.itemname
  var itemQty = parseInt(req.body.itemquantity) || 0
  var itemNo = req.body.itemNo

  var id = req.params.id
  // console.log(parseInt(itemQty))

  groceryList.findById(id, function (err, groceryList) {
    groceryList.items.splice(itemNo, 1, {
      'name': itemName,
      'quantity': itemQty
    })

    groceryList.save(function(err) {
      // handle the err

      res.json('ok')
    })
  // console.log(groceryList)
  })
})

module.exports = router
