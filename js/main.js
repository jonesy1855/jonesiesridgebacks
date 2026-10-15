document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('img[data-photo]').forEach(function (img) {
    img.addEventListener('error', function () {
      var box = document.createElement('div');
      box.className = 'photo-placeholder';

      var label = document.createElement('span');
      label.textContent = img.getAttribute('data-photo') || 'Photo';

      var hint = document.createElement('small');
      hint.textContent = 'Add file: ' + img.getAttribute('src');

      box.appendChild(label);
      box.appendChild(hint);
      img.replaceWith(box);
    });
  });
});
