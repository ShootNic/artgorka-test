document.addEventListener("DOMContentLoaded", () => {

  ymaps.ready(init);

  const iconSizes = (window.screen.width < 720) ? [[16, 20], [-8, -20]] : [[28, 35], [-14, -35]];

  function init() {
    var map = new ymaps.Map("map", {
      center: [58.53440426840788,31.303761304888276],
      zoom: 15
    });

    var myIcon = new ymaps.Placemark(
      [58.53440426840788,31.303761304888276],
      {
        hintContent: 'до 18:00',
        balloonContent: 'Арт горка *4,4'
      },
      {
        iconLayout: 'default#image',
        iconImageHref: './assets/svg/marker.svg',
        iconImageSize: iconSizes[0],
        iconImageOffset: iconSizes[1]
      }
    );

    map.geoObjects.add(myIcon);
  }
});

