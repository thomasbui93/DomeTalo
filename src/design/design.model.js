/**
 * Created by thoma on 10/22/2015.
 */
'use strict';
$module.controller('ModelController', ['$scope','$rootScope','$mdDialog','$mdToast',
    function($scope, $rootScope, $mdDialog, $mdToast) {

        var DialogModelController = function ($scope, $mdDialog, index) {
            $scope.index = index;
            $scope.selectModel = function (model) {
                $mdDialog.hide(model);
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }

        $scope.clientModel = null;

        $scope.showModelDialog = function (ev, model) {
            $mdDialog.show({
                controller: DialogModelController,
                templateUrl: '/model.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    index: model
                }
            })
                .then(function(answer) {
                    $scope.clientModel = answer;
                    $mdToast.show({
                        controller: "ToastController",
                        templateUrl: '/toast.html',
                        parent : angular.element(document.body),
                        hideDelay: 4000,
                        position: 'bottom right',
                        locals: {
                            message: answer
                        }
                    });
                }, function() {

                });
        };
        $scope.$watch(function () {
            return $scope.clientModel;
        }, function (ne, ol) {
            $rootScope.client.model = ne;
        })

    }
]).controller("ToastController", ["$scope", "$mdToast", "message", function ($scope, $mdToast, message) {
    $scope.message = message;
    $scope.closeToast = function () {
      $mdToast.hide();
    };
}])