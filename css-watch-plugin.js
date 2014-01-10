(function($){

  var methods = {}
  var watcher = {}
  var items = []
  var interval = null
  var time = 1000

	function Item ($dom, properties, callback) {
    this.node = $dom
    this.watchingProps = properties
    this.values = {}
    this.callback = callback
  }

  Item.prototype.extendProperties = function(properties) {
    var that = this
    $.each(properties, function(index, prop) {
      if ( that.watchingProps.indexOf(prop) === -1 ) {
        that.watchingProps.push(prop)
      }
    })
  }

  Item.prototype.check = function () {
    var that = this 
    var isChanged = false
    $.each(that.watchingProps, function(index, prop){
      var newValue = getPropValue(that.node, prop)
      if ( oldValue = that.values[prop]) {
        if ( !checkIsEqual(oldValue, newValue) ) {
          that.values[prop] = newValue
          console.log(that.values[prop])
          isChanged = true
        }
      } else {
        that.values[prop] = newValue
      }
    })
    return isChanged
  }

  // methods
  methods.watch = function(properties, callback) {
    $dom = this
    if (item = checkIfInArray($dom)) {
      item.extendProperties(properties)
      if (callback) {
        item.callback = callback
      }
    } else {
      newItem = new Item($dom, properties, callback)
      items.push(newItem)
    }
  }

 methods.unwatch = function(properties) {
    console.log(items)
    if (item = checkIfInArray($dom)) {
      if(!properties || properties === '*') {
        items.splice(items.indexOf(item))
      }
    }
    console.log(items)
  }
  // watcher
  watcher.runs = function() {
    intervalCheck()
  }
  watcher.stop = function() {
    clearInterval(interval)
  }
  watcher.reset = function() {
    items = []
  }

  function intervalCheck() {
    interval = setInterval(checkItemsProps, time)
  }

  function checkIsEqual(value1, value2) {
    var valueType = typeOf(value1)
    var isEqual = true
    if (valueType === 'object' || valueType === 'array') {
      $.each(value1, function(key, value){
        if (value2[key] !== value) {
          isEqual = false
        }
      })
    } else {
      isEqual = (value1 === value2)
    }
    return isEqual
  }

  function checkItemsProps() {
    $.each(items, function(index, item){
      if( item.check() ) {
        item.callback()
      } else {
      }
    })
  }

  function checkIfInArray($dom) {
    var foundItem = null
    $.each(items, function(index, item){
      if (item.node[0] === $dom[0]) {
        foundItem = item
      }
    })
    return foundItem
  }

  function getPropValue($dom, prop) {
    value = $dom.css(prop) || $dom[prop]()
    return value
  }

  function typeOf(param) {
    return Object.prototype.toString.call(param).toLowerCase().slice(8, -1)
  }

  jQuery.fn.extend(methods)
  jQuery.extend( jQuery, {watcher: watcher})

})(jQuery)