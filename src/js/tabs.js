document.addEventListener('DOMContentLoaded', () => {
  const tabsBtns = document.querySelectorAll('.js-tabs-item');
  tabsBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const tabs = this.closest('.js-tabs');
      tabs.querySelectorAll('.js-tabs-item').forEach((btn)=> {
        btn.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
})
