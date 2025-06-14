export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["admin/config.yml"]),
	mimeTypes: {".yml":"text/yaml"},
	_: {
		client: {start:"_app/immutable/entry/start.B7TfzbN2.js",app:"_app/immutable/entry/app.D-aTAgu1.js",imports:["_app/immutable/entry/start.B7TfzbN2.js","_app/immutable/chunks/DfiUWeaJ.js","_app/immutable/chunks/DEs7I_lf.js","_app/immutable/chunks/C6Ljvwsz.js","_app/immutable/entry/app.D-aTAgu1.js","_app/immutable/chunks/DEs7I_lf.js","_app/immutable/chunks/AxJwmsfL.js","_app/immutable/chunks/BKIRUviM.js","_app/immutable/chunks/Bb1vKxF8.js","_app/immutable/chunks/C6Ljvwsz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/admin"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
