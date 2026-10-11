/* core.js : utilitaires partagés + préférence « réduire les animations » */
(function () {
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  var BT = {
    reduce: mq.matches,
    $: function (sel, ctx) { return (ctx || document).querySelector(sel); },
    $$: function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); },
    scrollTo: function (el) {
      el.scrollIntoView({ behavior: BT.reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };
  window.BT = BT;

  document.documentElement.classList.add('js');

  // Les animations SVG (SMIL) ignorent le CSS : on les met en pause si besoin.
  if (BT.reduce) {
    BT.$$('svg').forEach(function (svg) {
      if (svg.pauseAnimations) svg.pauseAnimations();
    });
  }
})();
