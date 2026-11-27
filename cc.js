// Conta le visite in forma anonima, senza cookie (vedi Privacy e cookie).
(function () {
  var U = 'https://www.woodstockimmobiliare.it/gestionale/api/cc-visite.php';
  try {
    if (/[?&]nonconteggiare\b/.test(location.search)) { localStorage.setItem('cc_nc', '1'); }
    if (localStorage.getItem('cc_nc') === '1') { window.ccConta = function () {}; return; }
  } catch (e) {}
  if (location.hostname === 'localhost' || location.protocol === 'file:') { window.ccConta = function () {}; return; }
  function conta(ev) {
    try {
      var d = new URLSearchParams({ p: location.pathname, r: ev ? '' : document.referrer, w: String(screen.width || 0), e: ev || 'v' });
      if (navigator.sendBeacon) navigator.sendBeacon(U, d);
      else fetch(U, { method: 'POST', body: d, mode: 'no-cors', keepalive: true });
    } catch (e) {}
  }
  window.ccConta = conta;
  conta();
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a && /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//.test(a.href) && !a.hasAttribute('data-cc-no')) conta('whatsapp');
  }, true);
})();
