(function($){

	var methods = {}

	methods.watch = function() {
		console.log('keke')
		return 'ji'
	}

	methods.unwatch = function() {
		console.log(this)
		return 'unwatch'
	}

	jQuery.fn.extend(methods)

})(jQuery)