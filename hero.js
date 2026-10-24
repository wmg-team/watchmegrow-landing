// Hero a scorrimento: la scena resta fissa e lo scroll guida le variabili CSS (vedi .hero--scrub in styles.css).
// Con movimento ridotto non succede nulla: resta la versione statica.
(function () {
  var hero = document.getElementById("hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var stage = hero.querySelector(".hero-stage");
  var show = hero.querySelector(".hero-show");
  var copy = hero.querySelector(".hero-copy");
  var phone = hero.querySelector(".phone");
  var stem = hero.querySelector(".stem");
  var leaves = Array.prototype.slice.call(hero.querySelectorAll(".leaf"));
  var balloonsBox = hero.querySelector(".balloons");
  var balloons = Array.prototype.slice.call(balloonsBox.children);
  var header = document.querySelector(".site-header");
  var LEAF_SPAN = 0.14;
  var ticking = false;

  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };
  var range = function (p, a, b) {
    var t = clamp((p - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  var set = function (el, name, value) { el.style.setProperty(name, value); };

  // Le foglie si agganciano al fusto in base alla frazione di lunghezza (data-t).
  function placeLeaves() {
    var length = stem.getTotalLength();
    leaves.forEach(function (leaf) {
      var pt = stem.getPointAtLength(length * parseFloat(leaf.dataset.t));
      leaf.setAttribute("transform", "translate(" + pt.x + " " + pt.y + ") rotate(" + leaf.dataset.rot + ") scale(" + leaf.dataset.size + ")");
    });
  }

  function layout() {
    var w = show.clientWidth;
    var h = show.clientHeight;
    var desktop = w >= 900;
    // Su mobile i balloon stanno impilati in basso: scena e telefono usano solo lo spazio sopra.
    var lift = desktop ? 0 : balloonsBox.offsetHeight + 24;
    var area = h - lift;
    var phoneS = Math.min(1, (area - 24) / phone.offsetHeight, (w * (desktop ? 0.3 : 0.46)) / phone.offsetWidth);
    var phoneH = phone.offsetHeight * phoneS;
    var figW = Math.min(area * 0.94 * (336 / 650), w * (desktop ? 0.38 : 0.44));
    // Su mobile la pianta ha la stessa altezza del telefono e poggia sulla stessa linea di base.
    if (!desktop) figW = Math.min(figW, phoneH * (336 / 630));

    // Scala iniziale del logo: riempie lo spazio sotto il testo (la "W" più il margine inferiore sono il 32% dell'altezza della figura).
    var figH = figW * (650 / 336);
    var copyBottom = copy.offsetTop + copy.offsetHeight + 16;
    var s0 = Math.min(1.8, Math.max(0.7, (h * 0.97 - copyBottom) / (0.323 * figH)));
    set(hero, "--s0", s0);
    set(hero, "--lift", lift + "px");
    // Il margine vuoto sotto la W nel viewBox (20/336 della larghezza) va compensato per allineare la W alla base del telefono.
    // Su mobile il gruppo pianta + telefono è centrato nello spazio sopra i balloon.
    var gap = 12 + Math.max(0, (area - 24 - phoneH) / 2);
    set(hero, "--gap", gap + "px");
    set(hero, "--fig-bottom", (desktop ? h * 0.03 : lift + gap - figW * (20 / 336)) + "px");

    set(hero, "--hdr", header.offsetHeight + "px");
    set(hero, "--fig-w", figW + "px");
    set(hero, "--phone-s", phoneS);
    set(hero, "--pw", phone.offsetWidth * phoneS + "px");
    set(hero, "--ph", phoneH + "px");
  }

  function render() {
    ticking = false;
    var top = parseFloat(getComputedStyle(stage).top) || 0;
    var scrollable = hero.offsetHeight - stage.offsetHeight;
    var p = clamp((top - hero.getBoundingClientRect().top) / scrollable);
    var grow = clamp((p - 0.4) / 0.4);
    var copyP = range(p, 0.04, 0.2);

    set(hero, "--p", p);
    set(hero, "--copy", copyP);
    set(hero, "--move", range(p, 0.14, 0.36));
    set(hero, "--show", range(p, 0.28, 0.42));
    set(hero, "--grow", grow);
    copy.style.visibility = copyP >= 1 ? "hidden" : "";

    leaves.forEach(function (leaf) {
      var start = Math.min(parseFloat(leaf.dataset.t), 0.86);
      set(leaf, "--v", clamp((grow - start) / LEAF_SPAN));
    });

    balloons.forEach(function (balloon) {
      var start = parseFloat(balloon.dataset.start);
      set(balloon, "--in", range(p, start, start + 0.05));
    });
    // Su mobile il fumetto unico compare insieme alla prima riga.
    set(hero, "--bubble", range(p, parseFloat(balloons[0].dataset.start) - 0.02, parseFloat(balloons[0].dataset.start) + 0.03));
  }

  function request() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  hero.classList.add("hero--scrub");
  placeLeaves();
  layout();
  render();

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", function () { layout(); request(); });
})();
