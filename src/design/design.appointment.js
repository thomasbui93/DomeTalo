/**
 * Created by thoma on 10/25/2015.
 */
$module.controller('AppointmentController', ['$scope', '$rootScope','$mdToast',
    function ($scope, $rootScope, $mdToast) {
        $scope.appoinment = $rootScope.appointment;

        $scope.minDate = moment();
        $scope.maxDate = moment().add(1, 'M');
        $scope.gridWeek = [
                [true, true, false, true, false],
                [true, true, true, true, false],
                [false, true, true, false, true],
                [true, true, true, true, false]
        ];
        $scope.getWeekData = function () {
            for(var i = 0; i < 4; i ++){
                for ( var j = 0; j < 5; j++){
                    var bool = Math.random() < 0.5;
                    $scope.gridWeek[i][j] = Math.random() < 0.5;
                }
            }
        };
        (function () {
            var sunday = moment($scope.minDate).subtract($scope.minDate.day(), 'd');
            $scope.currentRange = [
                moment(sunday).add(1, 'd'),
                moment(sunday).add(2, 'd'),
                moment(sunday).add(3, 'd'),
                moment(sunday).add(4, 'd'),
                moment(sunday).add(5, 'd')
            ];
        })()
        
        $scope.nextWeek = function () {
            var currentRange = $scope.currentRange;
            if(moment(currentRange[0]).add(7, 'd').isBefore($scope.maxDate)){
                $scope.currentRange = [
                    moment(currentRange[0]).add(7, 'd'),
                    moment(currentRange[1]).add(7, 'd'),
                    moment(currentRange[2]).add(7, 'd'),
                    moment(currentRange[3]).add(7, 'd'),
                    moment(currentRange[4]).add(7, 'd')
                ];
                $scope.getWeekData();
            }else{
                $mdToast.show($mdToast.simple().content('Only a month from now allowed'));
            }

        };
        $scope.preWeek = function () {
            var currentRange = $scope.currentRange;
            if(moment(currentRange[0]).subtract(7, 'd').isAfter(moment())){
                $scope.currentRange = [
                    moment(currentRange[0]).subtract(7, 'd'),
                    moment(currentRange[1]).subtract(7, 'd'),
                    moment(currentRange[2]).subtract(7, 'd'),
                    moment(currentRange[3]).subtract(7, 'd'),
                    moment(currentRange[4]).subtract(7, 'd')
                ];
                $scope.getWeekData();
            }else{
                $mdToast.show($mdToast.simple().content('Only a month from now allowed'));
            }

        };

}])