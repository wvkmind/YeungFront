Ext.define("YeungFront.Config", {
	singleton: true,

	URL: function(url) {
		var ret = YeungFront.Config.BASE_API_HOST + YeungFront.Config.BASE_API_PATH;
		if (YeungFront.Config.CLIENT_CONTROL_API_URL) {
			ret = window.location.protocol + "//" + window.location.host 
		}
		return ret+url;
	},

	CLIENT_CONTROL_API_URL: Ext.manifest['env'] === 'production',
	BASE_API_HOST: "http://wvkmind.top",
	BASE_API_PATH: "/"
});