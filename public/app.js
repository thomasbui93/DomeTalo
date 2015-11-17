(function(undefined){

var $module = angular.module('app', ['ui.router','ngMaterial', 'angularMoment', 'ngAnimate']);
$module.config(['$stateProvider','$mdThemingProvider',
	function($stateProvider, $mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('amber')
			.accentPalette('indigo');
		$mdThemingProvider.theme('docs-dark')
			.primaryPalette('indigo')


		var states = {
			'index': {
				url: '',
				templateUrl: '/home.html',
				controller: 'HomeController'
			},
			'design': {
				url: '/design',
				templateUrl: '/design.html',
				controller: 'DesignController',
				abstract: true
			},
			'design.model': {
				url: '',
				views: {
					'design': {
						templateUrl: '/design.model.html',
						controller: 'ModelController'
					}
				}
			},
			'design.questionnaire':{
				url: '/questionnaire',
				views: {
					'design':{
						templateUrl: '/design.questionnaire.html',
						controller: 'QuestionnaireController'
					}
				}

			},
			'design.exterior':{
				url: '/exterior',
				views: {
					'design':{
						templateUrl: '/design.exterior.html',
						controller: 'ExteriorController'
					}
				}
			},
			'design.style':{
				url: '/style',
				views: {
					'design':{
						templateUrl: '/design.style.html',
						controller: 'StyleController'
					}
				}
			},
			'design.package': {
				url: '/package',
				views: {
					'design': {
						templateUrl: '/design.package.html',
						controller: 'PackageController'
					}
				}
			},
			'design.wall': {
				url: '/wall',
				views: {
					'design':{
						templateUrl: '/design.wall.html',
						controller: 'WallController'
					}
				}
			},
			'design.overview': {
				url: '/overview',
				views: {
					'design': {
						templateUrl: '/design.overview.html',
						controller: 'OverviewController'
					}
				}
			},
			'design.personal': {
				url: '/personal',
				views: {
					'design': {
						templateUrl: '/design.personal.html',
						controller: 'PersonalController'
					}
				}
			},
			'design.appointment':{
				url: '/appointment',
				views: {
					'design': {
						templateUrl: '/design.appointment.html',
						controller: 'AppointmentController'
					}
				}
			},
			'design.bathroom':{
				url: '/bathroom',
				views: {
					'design':{
						templateUrl: '/design.bathroom.html',
						controller: 'BathroomController'
					}
				}
			}
		};

		angular.forEach(states, function(config, name) {
			$stateProvider.state(name, config);
		});
	}
]);
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
/**
 * Created by thoma on 10/20/2015.
 */
'use strict';
$module.controller('DesignController', ['$scope','$rootScope','$state','$mdToast','NotificationServices','$mdDialog',
    function($scope, $rootScope, $state, $mdToast, NotificationServices, $mdDialog) {
       $scope.states = [
           {
               name: 'bathroom',
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

        $scope.showMain = true;
        $scope.toggleMenu = function () {
            $scope.showMain = !$scope.showMain;
        };
    }
]).controller('PackageToast', ["$scope", "$mdToast", "package", function ($scope, $mdToast, setPackage) {
    $scope.package = setPackage;
}]);
/**
 * Created by thoma on 10/23/2015.
 */
$module.controller('ExteriorController', ['$scope','$rootScope','$state',
    function ($scope, $rootScope, $state) {
        /*
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
        */
        $scope.options= {
            blanko: ['brown', 'grey', 'white'],
            prima: ['grey', 'red', 'white'],
            tabloid: ['grey', 'red', 'white']
        };

        if($rootScope.client.model!==null){
            $scope.exteriorImage = "images/exterior/"+$rootScope.client.model+"_white.jpg";
            $scope.colors = $scope.options[$rootScope.client.model];
        }else {
            $scope.exteriorImage = "images/exterior/prima_white.jpg";
            $scope.colors = $scope.options['prima'];
        }



        $scope.setColor = function (color) {
            $scope.exteriorImage = "images/exterior/"+$rootScope.client.model+"_"+color+".jpg";
            $rootScope.client.exterior = color;
        }
    }]);
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
/**
 * Created by thoma on 10/24/2015.
 */
$module.controller('PersonalController', ['$scope','$rootScope','$state',
    function ($scope, $rootScope, $state) {
        $scope.user = {};
    }]);
/**
 * Created by thoma on 11/16/2015.
 */
$module.controller('QuestionnaireController', ['$scope',
    function ($scope) {
        $scope.questionnaire ={
            familySize: '1'
        }
    }
]);
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
$module.controller('HomeController', ['$scope','$rootScope','$state',
	function($scope, $rootScope, $state) {
		$scope.setModel = function (model) {
			$rootScope.house = {
				modalType: model
			};
			$state.go('design.general');
		}

	}
]);
/**
 * Created by thoma on 10/22/2015.
 */
$module.factory('NotificationServices', ['$mdToast',function ($mdToast) {
    return {
        notifySelection: function (message) {

            $mdToast.show({
                controller: "ToastController",
                templateUrl: '/toast.html',
                parent : angular.element(document.body),
                hideDelay: 4000,
                position: 'bottom right',
                locals: {
                    message: message
                }
            });
        },
        changePackage: function (pack) {
            $mdToast.show({
                controller: "PackageToast",
                templateUrl: '/package.toast.html',
                parent : angular.element(document.body),
                hideDelay: 4000,
                position: 'bottom right',
                locals: {
                    package: pack
                }
            });
        }
    }
}])
}());