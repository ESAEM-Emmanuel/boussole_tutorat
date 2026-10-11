/* reveal.js : léger glissement des blocs à l'entrée dans l'écran.
   Le contenu reste toujours visible (aucune opacité à 0) : sans JS, rien n'est caché. */
(function () {
  var BT = window.BT;
  var approche = BT.$('.approche');

  if (!('IntersectionObserver' in window) || BT.reduce) {
    if (approche) approche.classList.add('in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove('wait');
      if (e.target.classList.contains('approche')) e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: .15 });

  BT.$$('.rise, .approche').forEach(function (el, i) {
    // On ne décale que les blocs situés sous l'écran au chargement
    if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('wait');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    io.observe(el);
  });
})();
