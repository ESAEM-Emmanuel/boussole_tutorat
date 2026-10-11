/* typed.js : phrase d'accroche qui s'écrit et s'efface */
(function () {
  var BT = window.BT;
  var el = BT.$('#typed');
  if (!el || BT.reduce) return;

  var phrases = [
    'Réviser les fonctions avant l\'examen',
    'Réussir sa dissertation en FRA4U',
    'Préparer le TPCL en 10e année',
    'Apprendre à lire en 1re année',
    'Maîtriser les fractions en 5e année',
    'Comprendre l\'histoire du Canada',
    'Reprendre confiance en mathématiques'
  ];

  var p = 0;
  var count = phrases[0].length;
  var deleting = true;

  (function tick() {
    var text = phrases[p];
    if (deleting) {
      count--;
      if (count <= 0) { deleting = false; p = (p + 1) % phrases.length; }
    } else {
      count++;
      if (count >= phrases[p].length) {
        deleting = true;
        el.textContent = phrases[p];
        return setTimeout(tick, 2200);
      }
    }
    el.textContent = phrases[p].slice(0, Math.max(count, 0));
    setTimeout(tick, deleting ? 28 : 55);
  })();
})();
