/**
 * App that provides AngularJS to other apps
 * @constructor
 */
function AngularJS( ) {

	return {
		/**
		 * Unused at the moment. These types of static registration info should probably go directly on the
		 * module.exports object
		 */
		vendor_id: 'Tradeshift',
		app_id:'AngularJS',
		version: '1.0',
		/**
		 * Defines what components this app exposes.
		 */
		components: {
			Engine: require('Engine')
		}
	}
}

module.exports = AngularJS;