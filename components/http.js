(function(angular){
	var http = angular.module('moviecat.service.http',[]);
	http.service('HttpServices',['$window','$document',function($window,$document){
		this.jsonp = function(url,data,callback){
		var urlSuffix = url.indexOf('?') == -1? '?' : '&';
		for(var key in data){
			urlSuffix += key + '=' + data[key] + '&';
		}
		var cbSuffix = 'my_json_cb_' + Math.random().toString().replace('.','');
		var cbName = 'callback='+ cbSuffix;
		$window[cbSuffix] = function(data){
			callback(data);
			document.body.removeChild(script);
		};
		urlSuffix += cbName;
		var script = $document[0].createElement('script');
		script.src = url + urlSuffix;
		$document[0].body.appendChild(script);
	}
	}]);
})(angular);
