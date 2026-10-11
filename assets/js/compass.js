/* compass.js : graduations, aiguille animée, interactions clavier/souris */
(function () {
  var BT = window.BT;
  var NS = 'http://www.w3.org/2000/svg';
  var dial = BT.$('#dial');
  var needle = BT.$('#needle');
  if (!dial || !needle) return;

  // Graduations tous les 5°, plus longues tous les 30°
  for (var i = 0; i < 72; i++) {
    var a = i * 5 * Math.PI / 180;
    var r1 = 128;
    var r2 = i % 6 === 0 ? 114 : 121;
    var line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', 160 + r1 * Math.sin(a));
    line.setAttribute('y1', 160 - r1 * Math.cos(a));
    line.setAttribute('x2', 160 + r2 * Math.sin(a));
    line.setAttribute('y2', 160 - r2 * Math.cos(a));
    line.setAttribute('stroke-width', i % 6 === 0 ? 2 : 1);
    dial.appendChild(line);
  }

  var labels = BT.$$('.compass .lbl');
  var order = [0, 90, 180, 270];
  var step = 0;
  var hold = false;
  var current = 0;

  function point(angle) {
    // Rotation par le chemin le plus court
    var diff = ((angle - current % 360) + 540) % 360 - 180;
    current += diff;
    needle.style.transform = 'rotate(' + current + 'deg)';
    labels.forEach(function (t) { t.classList.toggle('on', +t.dataset.a === angle); });
  }
  point(0);

  if (!BT.reduce) {
    setInterval(function () {
      if (hold) return;
      step = (step + 1) % order.length;
      point(order[step]);
    }, 2600);
  }

  function hook(el) {
    function on() { hold = true; point(+el.dataset.a); }
    function off() { hold = false; }
    el.addEventListener('mouseenter', on);
    el.addEventListener('mouseleave', off);
    el.addEventListener('focusin', on);
    el.addEventListener('focusout', off);
  }
  labels.forEach(hook);
  BT.$$('.volet[data-a]').forEach(hook);

  // Clic ou Entrée/Espace sur une étiquette : aller à la section associée
  labels.forEach(function (t) {
    function go() {
      var target = document.getElementById(t.dataset.target);
      if (target) BT.scrollTo(target);
    }
    t.addEventListener('click', go);
    t.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
})();
