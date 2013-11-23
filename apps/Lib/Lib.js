/**
 * Example service app
 * @constructor
 */
function Lib() {

	return {
		/**
		 * Unused at the moment. These types of static registration info should probably go directly on the
		 * module.exports object
		 */
		vendor_id: 'Tradeshift',
		app_id:'Lib',
		version: '1.0',
		/**
		 * Defines what components this app exposes.
		 */
		components: {
			Rest: require('Rest')
		}
	}
}

module.exports = Lib;