/* copy.js : boutons « Copier » du téléphone et du courriel */
(function () {
  var BT = window.BT;

  BT.$$('[data-copy]').forEach(function (btn) {
    var original = btn.textContent;

    function flash(msg) {
      btn.textContent = msg;
      setTimeout(function () { btn.textContent = original; }, 1600);
    }

    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.dataset.copy);
      var text = el.textContent.trim();

      function fallback() {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        flash('Sélectionné');
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash('Copié'); }, fallback);
      } else {
        fallback();
      }
    });
  });
})();
