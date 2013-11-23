/**
 * The JS part of the container framework.
 */
(function() {

	var globalModules = {},
		apps = {};

	window.Apps = {

		/**
		 * Register a new app
		 * @param App id
		 * @param Root app CommonJS module function
		 * @returns App definition
		 */
		register: function(id, bootstrapFunc) {

			if (apps[id]) {
				throw "App already registered: " + id;
			}

			var modules = {},
				views = {};

			/**
			 * App definition instance
			 */
			var app =  {
				id: id,
				/**
				 * Instantiate app instance
				 */
				init: function( ) {
					var module = {
						id: id,
						exports: {}
					};

					bootstrapFunc(module);

					var appFunc = module.exports;

					return new appFunc();

				},
				/**
				 * Register or instantiate module from this app
				 * @param id
				 * @param module
				 * @returns {*}
				 */
				module: function(id, module) {
					if (module) {
						modules[id] = module;
						return this;
					}

					var moduleFunc = modules[id];
					if (!moduleFunc) {
						throw "Unknown module " + id + " for app " + this.id;
					}

					var me = this;

					var module = {
						id: id,
						exports: {},
						view: function( id )  {
							return me.view(id);
						}
					};

					moduleFunc(module);

					return module.exports;
				},
				/**
				 * Instantiate singleton module (e.g. global module)
				 * @param id
				 * @returns {*}
				 */
				singleton: function ( id ) {
					if (globalModules[id]) {
						return globalModules[id];
					}

					var moduleFunc = modules[id];
					if (!moduleFunc) {
						throw "Unknown module " + id + " for app " + this.id;
					}

					var module = {
						id: id,
						exports: {}
					};

					moduleFunc(module);

					globalModules[id] = module.exports;

					return globalModules[id];

				},
				/**
				 * Get or set view on this app
				 * @param id
				 * @param view
				 * @returns {*}
				 */
				view: function(id, view) {
					if (view) {
						views[id] = view;
						return this;
					}

					var view = views[id];
					if (!view) {
						throw "Unknown view " + id + " for app " + this.id;
					}

					var wrapper = document.createElement('div');
					wrapper.innerHTML = decodeURIComponent(view.replace(/\+/g,' '));
					return wrapper;
				}
			};

			Object.freeze(app); //Lock it down, no changes should be made after this point.

			apps[id] = app;

			return app;
		},
		/**
		 * Instantiate app component
		 * @param appId
		 * @param component
		 * @returns {component}
		 */
		app: function( appId, component ) {
			if (!apps[appId]) {
				throw "App not found: " + appId ;
			}

			var app = apps[appId];
			var appInstance = app.init();

			if (!appInstance.components[component]) {
				throw "Component not found: " + appId + "." + component;
			}

			var component = appInstance.components[component];
			return new component();
		},

		/**
		 * Instantiate all apps and render the ones that should be.
		 */
		init: function() {
			for(var appId in apps) {
				var app = apps[appId];
				var appInstance = app.init();

				if (appInstance.components) {
					for(var componentId in appInstance.components) {
						var componentFunc = appInstance.components[componentId];
						var component = new componentFunc();

						if (component.url) {
							var urlRx = new RegExp(component.url);

							if (urlRx.test(location.hash.substr(1))) {
								var container = component.container ? component.container : 'body';
								var domElm = document.querySelector(container);
								var appDom = component.render();
								domElm.appendChild(appDom);
							}
						}
					}
				}
			}
		}
	};

	//Allow no changes to Apps
	Object.freeze(Apps);
})();

