var express = require('express')
var router = express.Router()

var groceryList = require('../models/grocery_list')

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

    groceryList.save()
  // console.log(groceryList)
  })
})

module.exports = router
