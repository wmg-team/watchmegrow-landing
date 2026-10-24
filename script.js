// Condivisione della pagina da grazie.html: usa il menu nativo del telefono, altrimenti copia il link.
(function () {
  var button = document.getElementById("condividi");
  var status = document.getElementById("share-status");
  if (!button) return;

  button.addEventListener("click", function () {
    var data = {
      title: button.dataset.shareTitle,
      text: button.dataset.shareText,
      url: button.dataset.shareUrl
    };

    if (navigator.share) {
      navigator.share(data).catch(function () {});
      return;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.text + " " + data.url).then(function () {
        status.textContent = "Link copiato! Incollalo dove vuoi.";
      }, function () {
        status.textContent = "Copia questo link: " + data.url;
      });
    } else {
      status.textContent = "Copia questo link: " + data.url;
    }
  });
})();
