function Lib() {

	return {
		vendor_id: 'Tradeshift',
		app_id:'Lib',
		version: '1.0',
		components: {
			Rest: require('Rest')
		}
	}
}

module.exports = Lib;