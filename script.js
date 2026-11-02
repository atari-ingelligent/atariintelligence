(function(){
  // Change the company name once here and it updates everywhere.
  var BRAND = 'ATARI Digital & Intelligent Technologies';
  document.querySelectorAll('.brand-name').forEach(function(el){ el.textContent = BRAND; });
  document.getElementById('year').textContent = new Date().getFullYear();

  // Loading screen with % counter (finishes quickly; skipped for reduced-motion users)
  var body = document.body;
  var pct = document.getElementById('loader-pct');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!pct || reduce) {
    body.classList.remove('is-loading');
  } else {
    var n = 0;
    var tick = setInterval(function(){
      n = Math.min(100, n + Math.ceil(Math.random() * 12));
      pct.textContent = n + '%';
      if (n >= 100) { clearInterval(tick); setTimeout(function(){ body.classList.remove('is-loading'); }, 150); }
    }, 45);
    // Safety net: never block the page for more than 2.5s
    setTimeout(function(){ clearInterval(tick); body.classList.remove('is-loading'); }, 2500);
  }

  // Header: transparent over the hero, solid after scrolling
  var header = document.querySelector('.site-header');
  function onScroll(){ header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var btn = document.getElementById('menu-btn');
  var links = document.getElementById('nav-links');
  function setMenu(open){
    links.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function(){ setMenu(!links.classList.contains('open')); });
  links.addEventListener('click', function(e){ if (e.target.closest('a')) setMenu(false); });

  // Partner ribbon: duplicate the logos so the scroll loops seamlessly
  var track = document.getElementById('marquee-track');
  if (track) {
    Array.prototype.slice.call(track.children).forEach(function(li){
      var copy = li.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      track.appendChild(copy);
    });
  }

  // Picture slots: if a picture file isn't there yet, show a placeholder naming the file to add
  document.querySelectorAll('[data-file] img').forEach(function(img){
    var slot = img.parentNode;
    function missing(){ slot.classList.add('missing'); }
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) missing();
    img.addEventListener('error', missing);
    img.addEventListener('load', function(){ slot.classList.remove('missing'); });
  });

  // Contact form (front-end only: connect to a form service or backend to receive messages)
  var form = document.getElementById('contact-form');
  var err = document.getElementById('form-error');
  var note = document.getElementById('form-note');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    note.hidden = true;
    var name = document.getElementById('f-name').value.trim();
    var email = document.getElementById('f-email').value.trim();
    var msg = document.getElementById('f-message').value.trim();
    var problems = [];
    if (!name) problems.push('your name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.push('a valid email');
    if (!msg) problems.push('a short message');
    if (problems.length) { err.textContent = 'Please add ' + problems.join(', ') + '.'; err.hidden = false; return; }
    err.hidden = true;
    note.hidden = false;
    form.reset();
  });
})();
