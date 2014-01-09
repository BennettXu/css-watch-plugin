(function($){

  var methods = {}
  var watcher = {}
  var items = []
  var interval = null
  var time = 100

	function Item ($dom, properties) {
    this.node = $dom
    this.watchProps = properties
  }

  Item.prototype.extendProperties = function(properties) {
    var that = this
    $.each(properties, function(index, prop) {
      if (that.watchProps.indexOf(prop) === -1 ) {
        that.watchProps.push(prop)
      }
    })
  }

  // methods
  methods.watch = function(properties) {
    $dom = this
    if (item = checkIfInArray($dom)) {
      item.extendProperties(properties)
    } else {
      newItem = new Item($dom, properties)
      items.push(newItem)
    }
    console.log(items)
  }

  methods.unwatch = function() {
    console.log(this)
    return 'unwatch'
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

  function checkItemsProps() {
    console.log('checkItemsProps')
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

  jQuery.fn.extend(methods)
  jQuery.extend( jQuery, {watcher: watcher})

})(jQuery)