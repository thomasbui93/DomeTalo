(function(undefined){

var $module = angular.module('app', ['ui.router','ngMaterial']);
$module.config(['$stateProvider',
	function($stateProvider) {
		var states = {
			'index': {
				url: '',
				templateUrl: '/home.html',
				controller: 'HomeController'
			}
		};

		angular.forEach(states, function(config, name) {
			$stateProvider.state(name, config);
		});
	}
]);
/**
 * Created by thoma on 10/20/2015.
 */
'use strict';
$module.controller('DesignController', ['$scope','$rootScope',
    function($scope, $rootScope) {
        $scope.generalImage = 'images/general-red.jpg';
        $scope.setGeneral = function (color) {
            $scope.generalImage = 'images/general-'+color+'.jpg';
            $rootScope.generalColor = color;
        };
        $scope.setWall = function (color) {
            $rootScope.wallColor = color;
        }
    }
]);
$module.factory('FooService', ['$http',
	function($http) {
		return {
			getFoo: function() {
				return $http.get('/foo').then(function(response) {
					return response.data;
				});
			}
		};
	}
]);
$module.controller('HomeController', ['$scope','$rootScope','$state',
	function($scope, $rootScope, $state) {
		$scope.setModel = function (model) {
			$rootScope.house = {
				modalType: model
			};
			$state.go('design.general');
		}

	}
]);
}());