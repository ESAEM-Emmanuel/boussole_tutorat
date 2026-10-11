/* chalk.js : symboles de craie qui flottent sur l'ardoise (canvas décoratif).
   L'animation s'arrête quand l'ardoise n'est plus visible ou l'onglet est masqué. */
(function () {
  var BT = window.BT;
  var cv = BT.$('#chalk');
  if (!cv || !cv.getContext) return;

  var ctx = cv.getContext('2d');
  var symbols = ['π', '√', '∑', 'é', 'ç', 'x²', '1867', '÷', '∞', 'Δ', 'Aa', '%', 'θ', '±'];
  var parts = [];
  var running = false;
  var visible = true;

  function resize() {
    var r = cv.getBoundingClientRect();
    var d = window.devicePixelRatio || 1;
    cv.width = r.width * d;
    cv.height = r.height * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }

  function seed() {
    var r = cv.getBoundingClientRect();
    var n = Math.round(r.width / 40);
    parts = [];
    for (var i = 0; i < n; i++) {
      parts.push({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        s: 14 + Math.random() * 22,
        v: .15 + Math.random() * .35,
        t: symbols[i % symbols.length],
        a: .05 + Math.random() * .1,
        r: (Math.random() - .5) * .6
      });
    }
  }

  function draw() {
    var r = cv.getBoundingClientRect();
    ctx.clearRect(0, 0, r.width, r.height);
    parts.forEach(function (q) {
      ctx.save();
      ctx.globalAlpha = q.a;
      ctx.fillStyle = '#eef3ee';
      ctx.font = '700 ' + q.s + 'px Literata, Georgia, serif';
      ctx.translate(q.x, q.y);
      ctx.rotate(q.r);
      ctx.fillText(q.t, 0, 0);
      ctx.restore();
      if (!BT.reduce) {
        q.y -= q.v;
        if (q.y < -30) { q.y = r.height + 30; q.x = Math.random() * r.width; }
      }
    });
  }

  function loop() {
    if (!running) return;
    draw();
    requestAnimationFrame(loop);
  }
  function start() {
    if (BT.reduce || running || !visible || document.hidden) return;
    running = true;
    requestAnimationFrame(loop);
  }
  function stop() { running = false; }

  resize();
  seed();
  draw();
  start();

  window.addEventListener('resize', function () { resize(); seed(); draw(); });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(BT.$('#accueil'));
  }
})();
