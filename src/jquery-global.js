import $ from 'jquery';

// Bootstrap 3 plugin files expect jQuery as a global, expose it before
// they are imported (module evaluation order follows import order)
window.jQuery = window.$ = $;

export default $;
