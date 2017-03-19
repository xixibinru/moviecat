(function(window,document){
	var jsonp = function(url,data,callback){
		var urlSuffix = url.indexOf('?') == -1? '?' : '&';
		for(var key in data){
			urlSuffix += key + '=' + data[key] + '&';
		}
		var cbSuffix = 'my_json_cb_' + Math.random().toString().replace('.','');
		var cbName = 'callback='+ cbSuffix;
		urlSuffix += cbName;
		window[cbSuffix] = function(data){
			callback(data);
			document.body.removeChild(script);
		};
		var script = document.createElement('script');
		script.src = url + urlSuffix;
		document.body.appendChild(script);
	}
	window.$$jsonp = jsonp;
})(window,document);
