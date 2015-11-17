/**
 * Created by thoma on 11/17/2015.
 */
$module.controller('StyleController', ['$scope','$state',
    function ($scope, $state) {
        $scope.chooseStyle = function ($event, color) {
            $scope.style = color;
        }
        $scope.book = function () {
            if($scope.style!== undefined){
                $state.go('design.appointment');
            }
        }
    }
]);