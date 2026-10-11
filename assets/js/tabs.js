/* tabs.js : onglets du programme (WAI-ARIA, navigation au clavier) */
(function () {
  var BT = window.BT;
  var tabs = BT.$$('[role="tab"]');
  if (!tabs.length) return;

  function open(i, focus) {
    tabs.forEach(function (b, j) {
      var on = j === i;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tabs[i].focus();
    tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { open(i); });
    b.addEventListener('keydown', function (e) {
      var n = tabs.length;
      var next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % n;
      else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = n - 1;
      if (next !== null) { e.preventDefault(); open(next, true); }
    });
  });

  // Les liens « Voir le programme détaillé » ouvrent l'onglet indiqué par data-level
  BT.$$('[data-level]').forEach(function (a) {
    a.addEventListener('click', function () {
      var i = parseInt(a.dataset.level, 10);
      if (!isNaN(i) && tabs[i]) open(i);
    });
  });
})();
