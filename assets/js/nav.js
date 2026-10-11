/* nav.js : menu mobile, défilement doux, lien actif, bouton « haut de page » */
(function () {
  var BT = window.BT;
  var bar = BT.$('#topbar');
  var menu = BT.$('#menu');
  var burger = BT.$('#burger');
  var toTop = BT.$('#totop');
  var links = BT.$$('.menu a');

  function closeMenu() {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.textContent = 'Menu';
  }

  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.textContent = open ? 'Fermer' : 'Menu';
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); burger.focus(); }
  });

  function setActive(id) {
    links.forEach(function (l) {
      var on = l.getAttribute('href') === '#' + id;
      l.classList.toggle('active', on);
      if (on) l.setAttribute('aria-current', 'location'); else l.removeAttribute('aria-current');
    });
  }

  // Défilement doux pour tous les liens d'ancre internes
  BT.$$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      BT.scrollTo(target);
      closeMenu();
      setActive(id);
    });
  });

  // Section courante selon le défilement (limité à une exécution par image)
  var ids = links.map(function (l) { return l.getAttribute('href').slice(1); });
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY;
    var limit = bar.offsetHeight + 80;
    var current = ids[0];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= limit) current = id;
    });
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1];
    setActive(current);
    bar.classList.toggle('scrolled', y > 10);
    toTop.hidden = y < 500;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: BT.reduce ? 'auto' : 'smooth' });
  });
})();
