// Animazioni d'ingresso delle sezioni sotto l'hero: ogni blocco appare una sola volta, quando entra nello schermo.
// Gli stili sono in styles.css ([data-reveal]). Senza JS o con movimento ridotto non succede nulla e tutto resta visibile.
(function () {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var targets = [
    [".problem .wrap > div", "left"],
    [".problem blockquote", "right"],
    [".section-head", "up"],
    [".step", "pop"],
    [".compare-col:first-child", "left"],
    [".compare-col.with", "right"],
    [".feature", "pop"],
    [".pricing-table-wrap", "up"],
    [".form-card", "up"],
    [".faq details", "up"],
    [".site-footer .wrap", "fade"]
  ];

  var observer = new IntersectionObserver(function (entries) {
    var visible = [];
    entries.forEach(function (entry) {
      var el = entry.target;
      if (entry.isIntersecting) {
        visible.push(el);
      } else if (entry.boundingClientRect.top < 0) {
        // Già superato (es. salto con un'ancora): mostra subito, senza animazione.
        el.classList.add("is-in", "is-done");
        observer.unobserve(el);
      }
    });
    visible
      .sort(function (a, b) {
        var ra = a.getBoundingClientRect();
        var rb = b.getBoundingClientRect();
        return ra.top - rb.top || ra.left - rb.left;
      })
      .forEach(function (el, i) {
        el.style.setProperty("--d", Math.min(i, 4) * 90 + "ms");
        el.classList.add("is-in");
        observer.unobserve(el);
      });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  targets.forEach(function (t) {
    document.querySelectorAll(t[0]).forEach(function (el) {
      el.dataset.reveal = t[1];
      el.addEventListener("transitionend", function (e) {
        if (e.target === el && e.propertyName === "opacity") el.classList.add("is-done");
      });
      el.querySelectorAll(".checklist li, .pricing-table tbody tr").forEach(function (item, i) {
        item.style.setProperty("--i", Math.min(i, 8));
      });
      observer.observe(el);
    });
  });
})();
