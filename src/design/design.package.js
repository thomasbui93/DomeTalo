/**
 * Created by thoma on 10/23/2015.
 */
$module.controller('PackageController', ['$scope','$rootScope','$state',
    function ($scope, $rootScope, $state) {
        $scope.package = $rootScope.client.package;

        $scope.setPackage = function (pack) {
            $rootScope.client.package = pack;
            $scope.package = pack;
            $scope.notifySelection(pack);
            $state.go('design.wall');
        };

    }]);