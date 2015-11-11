/**
 * Created by thoma on 10/23/2015.
 */
$module.controller('ExteriorController', ['$scope','$rootScope','$state',
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
        $scope.advanceColors = [{
            name: 'asphalt',
            code: '#2c3e50'
        }, {
            name: "asbestos",
            code: "#7f8c8d"
        }];
        $scope.isAdvance = false;

        $scope.selectedColor = $rootScope.client.exterior;
        $scope.exteriBase = "/images/exterior-";

        $scope.exteriorImages = [
            "/images/exterior-red.jpg",
            "/images/exterior-green.jpg",
            "/images/exterior-purple.jpg",
            "/images/exterior-blue.jpg",
            "/images/exterior-orange.jpg"
        ];

        if($scope.selectedColor !==null){
            var exteriorImage = $scope.exteriBase +$scope.selectedColor.name + ".jpg";
            $scope.indexExterior = $scope.exteriorImages.indexOf(exteriorImage);
        }else{
            $scope.indexExterior = 0;
        }

        $scope.setColor = function (color) {
            var exteriorImage = $scope.exteriBase +color.name + ".jpg";
            $scope.indexExterior = $scope.exteriorImages.indexOf(exteriorImage);
            $scope.selectedColor = color;
        };

        $scope.setExterior = function () {
            $rootScope.client.exterior = $scope.selectedColor;
            $state.go('design.package');
        };

        $scope.toggleAdvance = function () {
            $scope.isAdvance = !$scope.isAdvance;
        };
    }]);