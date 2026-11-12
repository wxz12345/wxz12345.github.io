(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  function store(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* storage unavailable */ }
  }

  var TITLES = { en: 'Xizhi Wang · HKUST', zh: 'Xizhi Wang · 香港科技大学' };

  /* ---------- Language ---------- */
  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    document.title = TITLES[lang];
    store('lang', lang);
  }
  setLang(root.getAttribute('data-lang') || 'en');
  document.getElementById('langToggle').addEventListener('click', function () {
    setLang(root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh');
  });

  /* ---------- Theme ---------- */
  var mql = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : mql.matches;
  }
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('theme', next);
  });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      navLinks.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Nav border on scroll ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- BibTeX toggles ---------- */
  document.querySelectorAll('.bib-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var bib = btn.closest('.pub__body').querySelector('.bib');
      var open = bib.hasAttribute('hidden');
      if (open) bib.removeAttribute('hidden'); else bib.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- Reveal on scroll + active nav link ---------- */
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          revealObs.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });

    var links = {};
    navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
          links[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) sectionObs.observe(s);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
