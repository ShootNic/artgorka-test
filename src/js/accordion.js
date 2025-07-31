document.addEventListener('DOMContentLoaded', () => {
  const accordionBtns = document.querySelectorAll('.js-accordion .direction__accordion-btn');
  accordionBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      btn.closest('.direction__accordion-item').classList.toggle('open');
    });
  });
})
