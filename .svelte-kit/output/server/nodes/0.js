import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Bs5zwd6A.js","_app/immutable/chunks/Bb1vKxF8.js","_app/immutable/chunks/DEs7I_lf.js"];
export const stylesheets = [];
export const fonts = [];
