document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.querySelector('.js-menu-toggle');
  const header = document.querySelector('.js-header');
  const links = document.querySelectorAll('.js-header .header__menu a');

  menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    header.classList.toggle('open');
    document.querySelector('html').classList.toggle('overflow');
  });

  links.forEach((link)=>{
    link.addEventListener('click', function (e) {
      header.classList.remove('open');
      document.querySelector('html').classList.remove('overflow');
    });
  })
});
