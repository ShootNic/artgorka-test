
document.addEventListener('DOMContentLoaded', () => {

  const elements = document.querySelectorAll('.js-drag-scroll');
  if(!elements ||  window.screen.width < 1080) {
    return;
  }

  class DragScroll {
    constructor(elem) {
      this.elem = elem;
      this.pos = {left: 0, x: 0};
      this.init();
    }

    init() {
      const scrollElem = this.elem;
      scrollElem.addEventListener('mousedown', (e) => {
        this.pos = {
          left: scrollElem.scrollLeft,
          x: e.clientX,
        };
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
      });
    }

    mouseMoveHandler = (e) => {
      const dx = e.clientX - this.pos.x;
      this.elem.scrollLeft = this.pos.left - dx;
    };

    mouseUpHandler = (e) => {
      e.preventDefault();
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
    };
  }

  elements.forEach((element) => {
    new DragScroll(element);
  });

});
