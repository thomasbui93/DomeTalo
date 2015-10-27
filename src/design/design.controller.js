/**
 * Created by thoma on 10/20/2015.
 */
'use strict';
$module.controller('DesignController', ['$scope','$rootScope','$state','$mdToast','NotificationServices','$mdDialog',
    function($scope, $rootScope, $state, $mdToast, NotificationServices, $mdDialog) {
       $scope.states = [
           {
               name: 'model',
               done: false
           },
           {
               name: 'exterior',
               done: false
           },
           {
               name: 'package',
               done: false
           },
           {
               name: 'wall',
               done: false
           },
           {
               name: 'floor',
               done: false
           },
           {
               name: 'window',
               done: false
           },
           {
               name: 'overview',
               done: false
           },
           {
               name: 'personal',
               done: false
           },
           {
               name: 'appointment',
               done: false
           }
       ];
        $scope.currentState = 'model';

        $rootScope.client = {
            model: null,
            exterior: null,
            package: null,
            wall: null,
            window: null,
            floor: null,
            price: "100,000"
        }

        $scope.toState = function (state) {
            $scope.currentState = state.name;
            $state.go('design.'+state.name);
        };

        $scope.$watch(function () {
            return $state.current.name;
        }, function (ne, ol) {
            $scope.currentState = ne.substr(7);
        });

        $rootScope.$watchCollection(function () {
            return $rootScope.client;
        }, function (ne, ol) {
            $scope.client = $rootScope.client;
            if($scope.client.model !== null){
                $scope.states[0].done = true;
            }
            if($scope.client.exterior !== null){
                $scope.states[1].done = true;
            }
            if($scope.client.package !== null){
                $scope.states[2].done = true;
            }
        });

        $scope.togglePackage = function ($event) {

            if($rootScope.client.package !== "standard"){
                $rootScope.client.package = "standard";
            }else{
                $rootScope.client.package = "plussa";
            }

            $rootScope.$broadcast('changePackage');
            $mdToast.show({
                controller: "PackageToast",
                templateUrl: '/change.package.html',
                parent : angular.element(document.body),
                hideDelay: 1000,
                position: 'bottom right',
                locals: {
                    package: $scope.client.package
                }
            });

        };

        $scope.notifySelection = NotificationServices.notifySelection;

        $scope.showPreviewDialog = function (ev) {
            $mdDialog.show({
                controller: PreviewDialogController,
                templateUrl: '/preview.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
            })
                .then(function(answer) {
                    $scope.clientModel = answer;
                }, function() {

                });
        };

        var PreviewDialogController = function ($scope, $rootScope, $mdDialog, $state) {
            $scope.client = {
                model: {
                    prop: $rootScope.client.model,
                    image: 'http://demo.wpcharming.com/construction/wp-content/uploads/2015/02/interior5-600x300.jpg'
                },
                exterior: {
                    prop: $rootScope.client.exterior,
                    image: function () {
                        if( $rootScope.client.exterior!== null){
                            return '/images/exterior-'+  $rootScope.client.exterior.name +'.jpg';
                        }else{
                            return null
                        }
                    }
                },
                package: {
                    prop: $rootScope.client.package,
                    image: function () {
                        if($rootScope.client.package!== null){
                            return '/images/package-'+  $rootScope.client.package.name +'.jpg';
                        }else{
                            return null;
                        }
                    }
                },
                wall: {
                    prop: $rootScope.client.wall,
                    image: function () {
                        if($rootScope.client.wall!== null){
                            return '/images/wall-'+  $rootScope.client.wall.name +'.jpg';
                        }else{
                            return null;
                        }
                    }
                },
                window:{
                    prop: $rootScope.client.window,
                    image: function () {
                        if($rootScope.client.window!== null){
                            return '/images/window-'+  $rootScope.client.window.name +'.jpg';
                        }else{
                            return null;
                        }
                    }
                },
                floor: {
                    prop: $rootScope.client.floor,
                    image: function () {
                        if($rootScope.client.floor!== null){
                            return '/images/floor-'+  $rootScope.client.floor.name +'.jpg';
                        }else{
                            return null;
                        }
                    }
                }
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.toState = function (category) {
                $scope.cancel();
                $state.go('design.' + category);
            }

            $scope.price = $rootScope.client.price;
        };
    }
]).controller('PackageToast', ["$scope", "$mdToast", "package", function ($scope, $mdToast, setPackage) {
    $scope.package = setPackage;
}]);