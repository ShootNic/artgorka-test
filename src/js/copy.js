document.addEventListener("DOMContentLoaded", () => {

  const btnCopy = document.querySelector('.js-copy');
  btnCopy.addEventListener('click', function (e) {
    e.preventDefault();
    navigator.clipboard.writeText('info@artgorka.ru');
    btnCopy.classList.add('success');
    setTimeout(()=> {
      btnCopy.classList.remove('success');
    }, 1000);
  });
});
