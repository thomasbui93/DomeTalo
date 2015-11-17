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