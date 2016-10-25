$(document).ready(function($){
  // console.log('jquery is working')
  var $line = $('.line')
  var $lineItemName = $('.line.name')
  var $groceryList = $('#grocery_list')

  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)

  $line.on('keydown', function (e){
    var key = e.which || e.keyCode
    if (key === 13) {
      // console.log('enter key works')
      e.preventDefault()
      var index = $line.index(this) + 1
      $line.eq(index).focus()
      saveDetails(this)
    }
  })

    $line.on('keydown', function (e){
      var key = e.which || e.keyCode
      if (key === 9) {
        // console.log('tab key works')
        e.preventDefault()
        var index = $line.index(this) + 1
        $line.eq(index).focus()
        saveDetails(this)
        // console.log(this)
      }
    })
    //focus on next div after pressing 'enter'

    function saveDetails(div) {
      // console.log($(div).text())
      var $lineName = $('.line.name')
      var $lineQty = $('.line.quantity')

      if ($(div).hasClass('line name') == true){
        var itemName = $(div).text()
        var index = $lineName.index(div)

        var qty = parseInt($($lineQty[index]).text())

        // console.log(qty)

        // if (typeof(qty) === 'number') {
          $.post({
            url: '/api/list/' + id,
            data: {
              'itemNo': index,
              'itemname': itemName,
              'itemquantity': qty
            }
          })

      }

      if($(div).hasClass('line quantity') == true){
        var qty = parseInt($(div).text())
        var index = $lineQty.index(div)

        var itemName = $($lineName[index]).text()
        // console.log(index)
        // var regex = /^[0-9]*$/
        //  if(regex.test(qty) === true) {
           $.post({
             url: '/api/list/' + id,
             data: {
               'itemNo': index,
               'itemname': itemName,
               'itemquantity': qty
             }
           })
        //  }

      }


    }


})
