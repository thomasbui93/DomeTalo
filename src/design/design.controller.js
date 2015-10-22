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