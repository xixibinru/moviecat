'use strict';

// Declare app level module which depends on views, and components
;(function(){
	var mainApp = angular.module('moviecat', [
		'ngRoute',
		'moviecat.movie_list'
	]);
	mainApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
	}]);
	mainApp.controller('navController',['$scope','$route',function ($scope,$route) {
		$scope.moveType = [
			{id:Math.random(),name:'正在热映',suffixUrl:'#/in_theaters/1'},
			{id:Math.random(),name:'即将上映',suffixUrl:'#/coming_soon/1'},
			{id:Math.random(),name:'TOP250',suffixUrl:'#/top250/1'}
		];
		$scope.currentMoiveType = $scope.moveType[0].id;
		$scope.addClass = function(id){
			$scope.currentMoiveType = id;
		}
		$scope.input = '';
		$scope.search = function () {
			$route.updateParams({category:'search',q: $scope.input});
		}
	}]);
})(angular);


// .controller('NavController', [
//   '$scope',
//   '$location',
//   function($scope, $location) {
//     $scope.$location = $location;
//     $scope.$watch('$location.path()', function(now) {
//       if (now.startsWith('/in_theaters')) {
//         $scope.type = 'in_theaters';
//       } else if (now.startsWith('/coming_soon')) {
//         $scope.type = 'coming_soon';
//       } else if (now.startsWith('/top250')) {
//         $scope.type = 'top250';
//       }
//       console.log($scope.type);
//     });
//   }
// ])
