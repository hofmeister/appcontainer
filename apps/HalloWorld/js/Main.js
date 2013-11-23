var angular = app('AngularJS','Engine'),
	rest = app('Lib','Rest');
/**
 * Display hallo world
 * @constructor
 */
function HalloWorldMain( ) {

	return {
		/**
		 * Part the UI component interface (needs defining and enforcing)
		 * @returns DOMElement
		 */
		render: function() {
			angularComponent = angular.component( );

			angularComponent.$controller('halloWorld',function( scope ) {

			});

			return angularComponent.$compile( module.view('halloworld.html') );
		},
		/**
		 * Regex that determines if this component is activated
		 */
		url: '.*',
		/**
		 * Target dom element for this component
		 */
		container: '#apps'
	}
}

module.exports = HalloWorldMain;