var angular = app('AngularJS','Engine'),
	rest = app('Lib','Rest');

function HalloWorldMain( ) {

	return {
		implements: [ Apps.UI_COMPONENT ],
		render: function() {
			angularComponent = angular.component( );

			angularComponent.$controller('halloWorld',function( scope ) {

			});

			return angularComponent.$compile( module.view('halloworld.html') );
		},
		url: '.*',
		container: '#apps'
	}
}

module.exports = HalloWorldMain;