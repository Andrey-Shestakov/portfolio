'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  let carousel = document.querySelector('#E7639650685');
  let carouselItems = carousel.querySelectorAll('.main__section-about-carousel-item');
  let carouselItemsList = carousel.querySelector('.main__section-about-carousel-items-list');

  let carouselButtons = carousel.querySelectorAll('.main__section-about-carousel-button');
  for (let carouselButton of carouselButtons) {
    carouselButton.addEventListener('click', (event) => {
      let carouselStyle = carousel.currentStyle || window.getComputedStyle(carousel);
      let carouselItemStyle = carouselItems[0].currentStyle || window.getComputedStyle(carouselItems[0]);
      let carouselItemListStyle = carouselItemsList.currentStyle || window.getComputedStyle(carouselItemsList);
      
      if (carouselButton.getAttribute('data-event') == 'carousel-left') {
        if (carouselItemsList.offsetLeft < 0) {
          carouselItemsList.style.marginLeft = parseInt(carouselItemListStyle.marginLeft) + (carouselItems[0].offsetWidth + parseInt(carouselItemStyle.marginRight)) + 'px';
          carouselItemsList.style.marginRight = Math.abs(parseInt(carouselItemsList.style.marginLeft)) + 'px';
        }
      }

      let carouselItemLastOffsetRight = carouselItems[carouselItems.length - 1].offsetLeft + parseInt(carouselItemStyle.width);
      if (carouselButton.getAttribute('data-event') == 'carousel-right') {
        if (carouselItemLastOffsetRight > parseInt(carouselStyle.width)) {
          carouselItemsList.style.marginLeft = parseInt(carouselItemListStyle.marginLeft) - (carouselItems[0].offsetWidth + parseInt(carouselItemStyle.marginRight)) + 'px';
          carouselItemsList.style.marginRight = Math.abs(parseInt(carouselItemsList.style.marginLeft)) + 'px';
        }
      }
    });
  }
});