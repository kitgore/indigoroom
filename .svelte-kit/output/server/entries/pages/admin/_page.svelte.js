import { h as head } from "../../../chunks/index.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.out += `<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"><\/script><!---->`;
  });
  $$payload.out += `<div id="nc-root"></div>`;
}
export {
  _page as default
};
