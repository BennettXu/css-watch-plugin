$.watcher.runs()
$('div').watch(['height', 'top'])
$('div').watch(['height', 'width'])
setTimeout($.watcher.stop, 1000)
// console.log($('div').unwatch())


