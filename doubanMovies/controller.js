(function (angular) {
	//创建一个模块
	var module = angular.module('moviecat.movie_list', [
		//配置路由需要的模块
		'ngRoute',
		//自己写的http服务(利用script标签进行跨域请求数据)
		'moviecat.service.http'
	]);
	module.config(['$routeProvider', function ($routeProvider) {
		//配置一个路由信息 当它在xxx路径时
		$routeProvider.when('/:category/:page', {
			//加载对应html页面 放在含有“ng-view”属性的标签中
			templateUrl: 'doubanMovies/movie_list.html',
			//这个html标签被下面的控制器管理
			controller: 'doubanMoviesController'
		});
	}]);
	//创建一个控制器
	module.controller('doubanMoviesController', [
		//$scope用于双向数据绑定
		'$scope',
		//拿到路由路由参数集
		'$routeParams', //数据来源 1. 路由匹配出来的 2. ?参数
		//拿到$route服务 更新url需要
		'$route',
		//拿到自己写的jsonp服务
		'HttpServices',
		function ($scope, $routeParams,$route, HttpServices) {
			//在未请求到数据时显示css3 loading动画
			$scope.loading = true;
			var page = parseInt($routeParams.page); //拿到当前是第几页
			var count = 10; //每页条数
			var start = (page - 1) * count; //当前页从哪开始
			$scope.title = 'loading...';//标题
			$scope.currentPage = page; //当前页
			$scope.totalCount = 0; //总共的条数
			$scope.totalPages = 0; //总共的页数
			//定义一个数组 用来存放拿到的数据
			$scope.subjects = [];


			//请求数据
			HttpServices.jsonp('http://api.douban.com/v2/movie/' + $routeParams.category,
				{count: count, start: start , q: $routeParams.q},
				function (data) {
					console.log(data);
					//绑定数据
					$scope.subjects = data.subjects;
					$scope.title = data.title; //数据的标题
					$scope.totalCount = data.total; //数据的总数
					$scope.totalPages = Math.ceil($scope.totalCount/count); //总页数
					$scope.loading = false; //加载完后关闭loading
					//angular在使用第三方services时,需要apply一下
					$scope.$apply();
				});
			// 进行上下页操作
			$scope.goPage = function(page){
				if(page >= 1 && page <= $scope.totalPages){
					$route.updateParams({page:page});
				}
			}
		}]);
})(angular)


//利用angular进行假数据绑定 (注：利用angular提供的jsnp向豆瓣请求数据 豆瓣后台无法识别angular的回调函数 angular的回调函数是生成在全局对象中的angular对象中 豆瓣后台在拼接回调函数字符串时不支持带"."的，因此需要自己写一个jsonp)
// module.controller('inTheatersController',[
// 	'$scope',
// 	'$http',
// 	function($scope, $http){
// 		$scope.subjects = [];
// 		$http.get('/moviecat/app/data/in_theaters.json')
// 		.then(function(respond){
// 			if(respond.status == 200){
// 				console.log(respond);
// 			$scope.subjects = respond.data.subjects;
// 			}else{
// 				console.log(respond.statusText);
// 			}
// 		},function(error){
// 			console.log(error);
// 		});
// 	}
// ]);
