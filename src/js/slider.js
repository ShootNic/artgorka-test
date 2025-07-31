import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll('.js-carousel').forEach(swiperEl => {
    const nextEl = swiperEl.querySelector('.swiper-button-next');
    const prevEl = swiperEl.querySelector('.swiper-button-prev');

    new Swiper(swiperEl, {
      modules: [Navigation],
      slidesPerView: 'auto',
      freeMode: true,
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
    });
  });
});
