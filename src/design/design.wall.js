/**
 * Created by thoma on 10/23/2015.
 */
$module.controller('WallController', ['$scope','$rootScope','$state',
    function ($scope, $rootScope, $state) {
        $scope.colors = [{
            name: 'red',
            code: '#F44336'
        }, {
            name: 'green',
            code: '#4CAF50'
        }, {
            name: 'purple',
            code: '#673AB7'
        }, {
            name: 'blue',
            code: '#3F51B5'
        }, {
            name: 'orange',
            code: '#FF9800'
        }];
        $scope.selectedColor = $rootScope.client.wall;
        $scope.wallBase = "/images/wall-";

        $scope.wallImages = [
            "/images/wall-red.jpg",
            "/images/wall-green.jpg",
            "/images/wall-purple.jpg",
            "/images/wall-blue.jpg",
            "/images/wall-orange.jpg"
        ];
        
        if($scope.selectedColor !==null){
            var wallImage = $scope.wallBase +$scope.selectedColor.name + ".jpg";
            $scope.indexWall = $scope.wallImages.indexOf(wallImage);
        }else{
            $scope.indexWall = 0;
        }

        $scope.setColor = function (color) {
            var wallImage = $scope.wallBase +color.name + ".jpg";
            $scope.indexWall = $scope.wallImages.indexOf(wallImage);
            $scope.selectedColor = color;
        };

        $scope.setWall = function () {
            $rootScope.client.wall = $scope.selectedColor;
            $state.go('design.floor');
        };

    }]);