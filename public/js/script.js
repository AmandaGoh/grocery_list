$(document).ready(function($){
  // console.log('jquery is working')
  var $line = $('.line')
  var $lineItemName = $('.line.name')
  var $groceryList = $('#grocery_list')

  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)

  $groceryList.on('keypress', '.line' ,function (e){
    var key = e.which || e.keyCode
    if (key === 13) {
      // console.log('enter key works')
      e.preventDefault()
      saveDetails(this)
    }
  })

  $groceryList.on('keydown', '.line', function (e){
    var key = e.which || e.keyCode
    if (key === 9) {
      console.log('tab key works')
      e.preventDefault()
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

          $.post({
            url: '/api/list/' + id,
            data: {
              'itemNo': index,
              'itemname': itemName,
              'itemquantity': qty
            }
          }).then(focusNextTab(div))

      }

      if($(div).hasClass('line quantity') == true){
        var qty = parseInt($(div).text())
        var index = $lineQty.index(div)

        var itemName = $($lineName[index]).text()

           $.post({
             url: '/api/list/' + id,
             data: {
               'itemNo': index,
               'itemname': itemName,
               'itemquantity': qty
             }
           })
           .done(
             focusNextTab(div, createNextLine)
           )

      }
    }

    function createNextLine(div){
      // console.log($(div).is(':last-child'))
      if ( $(div).is(':last-child')){
        var $lineName = $('<div>', {
          "class": 'line name',
          "contenteditable": true})
          var $lineQty = $('<div>', {
            "class": 'line quantity',
            "contenteditable": true
          })
          $('#grocery_list').append($lineName)
          $('#grocery_list').append($lineQty)
      }

    }

    function focusNextTab(div, cb) {
      // console.log($('div#grocery_list div.line').index(div))
      var index = $('div#grocery_list div.line').index(div) + 1
      $('div#grocery_list div.line').eq(index).focus()

      cb(div)
    }

  })
