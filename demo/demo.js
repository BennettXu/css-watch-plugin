$.watcher.runs(100)

var $upperBox = $('div#upper')
var $watchingBox = $('div#watching')
var $shadowBox = $('div#shadow')
var $dragableBox = $('div#dragable')
var $watchButton = $('button#watch-drag')
var isWatching = false


// watch box auto change
$('button#watching').on('click', function() {
  $watchingBox.css('width', 30 + parseInt($watchingBox.css('width')))
})

$watchingBox.watch(['offset', 'outerWidth', 'outerHeight'], function(){
  updateShadowBoxToWatchingBox()
})

setTimeout(function() {
  $upperBox.animate({height:'30px'}, 2000)
}, 300)


// watch dragble box
$dragableBox.watch(['outerWidth', 'outerHeight'], function(){
  updateShadowBoxToDragableBox()
})
$watchButton.on('click', function(event){
  if (isWatching === false ) {
    $(this).text('unwatch')
    $dragableBox.watch(['offset'], function(){
      updateShadowBoxToDragableBox()
    }, true)
  } else {
    $(this).text('watch dragable box')
    $dragableBox.unwatch()
  }
  isWatching = !isWatching
})

$dragableBox.on('mousedown', function(event){
  event.preventDefault()
  var offset = $(this).offset()
  var innerOffset = {
    x: event.pageX - parseInt(offset.left),
    y: event.pageY - parseInt(offset.top)
  }
  var foo = null
  $(document).on('mousemove', foo = function(event) {
    var newOffset = { 
      left: event.pageX - innerOffset.x,
      top: event.pageY - innerOffset.y
    }
    $dragableBox.offset(newOffset)
    event.preventDefault()
  })
  $(document).on('mouseup', function(){
    $(document).off('mousemove', foo)
  })

})

// watcher api
$('button#runs').on('click', function(){
  $.watcher.runs(20)
})

$('button#stop').on('click', function(){
  $.watcher.stop()
})

$('button#reset').on('click', function(){
  $.watcher.reset()
})

// functions 
function updateShadowBoxToDragableBox() {
  var offset = {
    left: parseInt($dragableBox.offset().left) + 5,
    top: parseInt($dragableBox.offset().top) + 5
  }
  $shadowBox.offset(offset)
  $shadowBox.outerHeight($dragableBox.outerHeight())
  $shadowBox.outerWidth($dragableBox.outerWidth())
}

function updateShadowBoxToWatchingBox() {
  var offset = {
    left: parseInt($watchingBox.offset().left) + 5,
    top: parseInt($watchingBox.offset().top) + 5
  }
  $shadowBox.offset(offset)
  $shadowBox.outerHeight($watchingBox.outerHeight())
  $shadowBox.outerWidth($watchingBox.outerWidth())
}
