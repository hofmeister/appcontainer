/**
 * Provides AngularJS to other apps
 * @constructor
 */
function AngularEngine() {
	var angular = require('angular',true);

	return {
		/**
		 * Creates a angular component that can be used to add controllers and compile templates
		 */
		component: function( ) {

			var compiler = null;
			var angularComponent = {
				scope: null,
				$compile: function(template) {
					var element =  compiler( template )(this.scope);
					this.scope.$digest();
					return element[0];
				},
				$controller: function(name, controller) {
					this.scope[name] = controller;
					this.scope[name].$inject= ['$scope'];
				}
			};

			angular.injector(['ng']).invoke(['$rootScope', '$compile',
				function(scope, compile) {
					compiler = compile;
					angularComponent.scope = scope.$new();

				}]);

			return angularComponent;
		}
	}
}

module.exports = AngularEngine;