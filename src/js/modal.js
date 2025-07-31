document.addEventListener("DOMContentLoaded", () => {

  const modalCloseBtns = document.querySelectorAll('.js-modal-close');
  const modalOpenBtns = document.querySelectorAll('.js-modal-open');
  const modals = document.querySelectorAll('.js-modal');

  modalCloseBtns.forEach(function(modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      modals.forEach((modal) => {
        modal.classList.remove('show');
      });
    });
  });

  modalOpenBtns.forEach(function(modalOpenBtn) {
    modalOpenBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const target = modalOpenBtn.dataset.target;
      const modal = document.querySelector('.js-modal[data-modal='+ target +']');
      modal.classList.add('show');
    });
  });
});
