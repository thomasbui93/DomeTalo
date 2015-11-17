/**
 * Created by thoma on 11/17/2015.
 */
$module.controller('BathroomController', ['$scope',
    function ($scope) {
        $scope.bathroomImage = 'images/bathroom/mind.jpg';
        $scope.styles = [
            {
                name: 'mind',
                color: 'grey'
            },
            {
                name: 'alto',
                color: 'white'
            },
            {
                name: 'loft',
                color: '#ccc'
            }
        ];

        $scope.setStyle = function (style) {
            $scope.bathroomImage = 'images/bathroom/'+ style.name+'.jpg';
        }
    }
]);