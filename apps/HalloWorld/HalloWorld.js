function HalloWorld() {

	return {
		vendor_id: 'Tradeshift',
		app_id:'HalloWorld',
		version: '1.0',
		components: {
			Main: require('Main')
		}
	}
}

module.exports = HalloWorld;