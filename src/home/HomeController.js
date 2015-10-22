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