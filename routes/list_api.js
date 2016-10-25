var express= require('express')
var router= express.Router()

var groceryList = require('../models/grocery_list')

router.post('/:id', function (req, res){
  var itemName = req.body.itemname
  var itemQty = parseInt(req.body.itemquantity) || 0
  var itemNo = req.body.itemNo

  var id = req.params.id
  // console.log(parseInt(itemQty))
  
  groceryList.findById(id, function (err, groceryList){
    //check if qty cell is empty return 0 if it is
    // if (typeof(itemQty) === 'number'){
      groceryList.items.splice(itemNo, 1, {
        'name': itemName,
        'quantity': itemQty
      })
    // } else {
      // groceryList.items.splice(itemNo, 1, {
      //   'name': itemName,
      //   'quantity':
      // })
    // }

    groceryList.save()
    console.log(groceryList)
  })



    // groceryList.local.items[itemNo].set({
    //   'local.items': itemName,
    //     // 'quantity' : itemquantity
    // })
    // console.log(groceryList)
  // })

  // var itemname = req.body.items[0].itemname
  // var itemquantity = req.body.items[0].itemquantity
  // console.log(itemname)

})

module.exports = router
