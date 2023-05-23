'use strict';

// После полной загрузки документа создаем экземпляры класса Form
document.addEventListener('DOMContentLoaded', (event) => {
  Debugger.log('Поиск форм...');
  /** @type {NodeList} */
  let formsElements = document.querySelectorAll('form');
  for (let formElement of formsElements) {
    let form = new Form(formElement);
  }
  Debugger.log('Поиск форм завершен.');
  
  Debugger.log('Поиск слайдеров...');
  /** @type {NodeList} */
  let carouselsElements = document.querySelectorAll('[data-element-type="carousel"]');
  for (let carouselElement of carouselsElements) {
    if (carouselElement.getAttribute('data-carousel-name') == 'carousel-costs') {
      /** @type {CarouselCosts} */
      let carousel = new CarouselCosts(carouselElement);
    }
  }
  Debugger.log('Поиск слайдеров завершен.');

  /**
   * Видеоплеер
   */

  /** @type {HTMLElement} */
  let videoControllerButton = document.querySelector('.section__video-button');
  videoControllerButton.addEventListener('click', (event) => {
    videoControllerButton.classList.toggle('section__video-button_is-active');

    /** @type {HTMLElement} */
    let videoElement = document.querySelector('.section__video');
    if (videoControllerButton.classList.contains('section__video-button_is-active')) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  });

  /**
   * Бургер-меню
   */

  /** @type {HTMLElement} */
  let headerNavigationButton = document.querySelector('.header__topbar-navigation-button');
  /** @type {HTMLElement} */
  let headerNavigation = document.querySelector('.header__topbar-navigation');

  headerNavigationButton.addEventListener('click', (event) => {
    headerNavigation.classList.toggle('header__topbar-navigation_is-dropdown');
    headerNavigation.classList.toggle('container');
    headerNavigation.classList.toggle('container_header-dropdown-navigation');
  });

  // Скрытие бургера при переходе в десктопный вариант
  window.addEventListener("resize", (event) => {
    if (window.screen.width > 1100) {
      headerNavigation.classList.remove('header__topbar-navigation_is-dropdown');
      headerNavigation.classList.remove('container');
      headerNavigation.classList.remove('container_header-dropdown-navigation');
    }
  });
});