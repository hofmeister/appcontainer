/**
 * The hallo to world
 * @constructor
 */
function HalloWorld() {

	return {
		/**
		 * Unused at the moment. These types of static registration info should probably go directly on the
		 * module.exports object
		 */
		vendor_id: 'Tradeshift',
		app_id:'HalloWorld',
		version: '1.0',
		/**
		 * Defines what components this app exposes.
		 */
		components: {
			Main: require('Main')
		}
	}
}

module.exports = HalloWorld;