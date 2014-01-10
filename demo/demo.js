$.watcher.runs()

$('div').watch(['offset', 'outerWidth', 'outerHeight'], function(){
  console.log('change')
})

setTimeout($('div').unwatch, 5000)


