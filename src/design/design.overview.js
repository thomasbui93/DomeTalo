/**
 * Created by thoma on 10/24/2015.
 */
$module.controller('OverviewController', function ($scope, $rootScope,$state) {
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


    $scope.toState = function (category) {
        $state.go('design.' + category);
    }

    $scope.price = $rootScope.client.price;
});