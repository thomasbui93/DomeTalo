angular.module("app").run(['$templateCache', function(a) { a.put('/home.html', '<h1 class="text-center">Design Your Home</h1><h3 class="text-center">Choose a Model</h3><div class="container"><div class="row"><div class="col-md-3 col-md-offset-1" ng-click="setModel(\'alpha\')"><img src="images/model1.jpg" class="model-image"><p>Alpha Model</p></div><div class="col-md-3" ng-click="setModel(\'beta\')"><img src="images/model2.jpg" class="model-image"><p>Beta Model</p></div><div class="col-md-3" ng-click="setModel(\'omega\')"><img src="images/model3.jpg" class="model-image"><p>Omega Model</p></div></div></div>');
	a.put('/design.wall.html', '<div><div class="image-container"><img ng-src="{{wallImage}}"></div><div class="container"><div class="row"><h3 class="state-title">Wall Design</h3><ul class="customer-choice"><li><div style="background-color: #e74c3c" ng-click="setWall(\'red\')"></div><p class="text-center">Red</p></li><li><div style="background-color: #8e44ad" ng-click="setWall(\'red\')"></div><p class="text-center">Purple</p></li><li><div style="background-color: #2c3e50"></div><p class="text-center">Midnight</p></li><li><div style="background-color: #f1c40f"></div><p class="text-center">Yellow</p></li><li><div style="background-color: #16a085"></div><p class="text-center">Turquoise</p></li><div class="button-group"><a ui-sref="index"><button class="btn btn-default">Back</button></a> <a ui-sref="design.package"><button class="btn btn-default">Next</button></a></div></ul></div></div></div>');
	a.put('/design.html', '<div><ul class="process-tracker"><li ui-sref-active="active"><a ui-sref="design.general"><div></div><div class="circle"></div></a></li><li ui-sref-active="active"><a ui-sref="design.wall"><div></div><div class="circle"></div></a></li><li ui-sref-active="active"><a ui-sref="design.insideRoof"><div></div><div class="circle"></div></a></li><li ui-sref-active="active"><a ui-sref="design.floor"><div></div><div class="circle"></div></a></li></ul><div ui-view="design"></div></div>');
	a.put('/design.general.html', '<div><div class="image-container"><img ng-src="{{generalImage}}"></div><div class="container"><div class="row"><h3 class="state-title">General Color</h3><ul class="customer-choice"><li><div style="background-color: #e74c3c" ng-click="setGeneral(\'red\')"></div><p class="text-center">Red</p></li><li><div style="background-color: #8e44ad" ng-click="setGeneral(\'purple\')"></div><p class="text-center">Purple</p></li><li><div style="background-color: #2c3e50"></div><p class="text-center">Midnight</p></li><li><div style="background-color: #f1c40f"></div><p class="text-center">Yellow</p></li><li><div style="background-color: #16a085"></div><p class="text-center">Turquoise</p></li><div class="button-group"><a ui-sref="index"><button class="btn btn-default">Back</button></a> <a ui-sref="design.package"><button class="btn btn-default">Next</button></a></div></ul></div></div></div>');
	 }]);