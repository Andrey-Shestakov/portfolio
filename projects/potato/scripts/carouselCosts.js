'use strict';

class CarouselCosts {
  constructor(element) {
    this.setElement(element);
    this.init();

    Debugger.log('Слайдер создан.');
  }

  /**
   * Назначение DOM-элемента
   * @param {HTMLElement} element 
   */
  setElement(element) {
    this.element = element;
  }

  /**
   * Получение DOM-элемента
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Инициализация слайдера
   */
  init() {
    /** @type {HTMLElement} */
    let carouselElement = this.getElement();

    // Инициализация панели управления слайдером
    /** @type {NodeList} */
    let carouselControllers = carouselElement.querySelectorAll('.carousel-costs__controll-button[data-carousel-controll]');
    for (let carouselController of carouselControllers) {
      // Добавляем событие клика на кнопки слайдера
      carouselController.addEventListener('click', (event) => {
        /** @type {HTMLUListElement} */
        let carouselSlidesListElement = carouselElement.querySelector('.carousel-costs__slides-list');
        /** @type {NodeList} */
        let carouselSlidesElementsList = carouselSlidesListElement.querySelectorAll('.carousel-costs__slide');
        /** @type {Number} */
        let carouselSlidesElementsCount = carouselSlidesElementsList.length;
        /** @type {HTMLLinkElement} */
        let carouselFirstSlideElement = carouselSlidesElementsList[0];
        /** @type {Object} */
        let carouselFirstSlideElementStyle = carouselFirstSlideElement.currentStyle || window.getComputedStyle(carouselFirstSlideElement);
        // Кнопка слайдера "Влево"
        if (carouselController.getAttribute('data-carousel-controll') == 'slide-left') {
          /** @type {Number} */
          let slideStyleMarginLeft = parseInt(carouselFirstSlideElementStyle.marginLeft);
          if (slideStyleMarginLeft < 0 && slideStyleMarginLeft < ((carouselSlidesElementsCount - 1) * parseInt(carouselFirstSlideElement.offsetWidth))) {
            carouselFirstSlideElement.style.marginLeft = parseInt(carouselFirstSlideElementStyle.marginLeft) + parseInt(carouselFirstSlideElement.offsetWidth) + 'px';
          }
        }
        // Кнопка слайдера "Вправо"
        if (carouselController.getAttribute('data-carousel-controll') == 'slide-right') {
          /** @type {Number} */
          let slideStyleMarginLeft = parseInt(carouselFirstSlideElementStyle.marginLeft);
          if ((slideStyleMarginLeft * -1) < ((carouselSlidesElementsCount - 1) * parseInt(carouselFirstSlideElement.offsetWidth))) {
            carouselFirstSlideElement.style.marginLeft = parseInt(carouselFirstSlideElementStyle.marginLeft) - parseInt(carouselFirstSlideElement.offsetWidth) + 'px';
          }
        }

        Debugger.log('Клик по кнопке слайдера.');
      });
    }

    /** @type {Number} */
    let carouselIndicatorIndex = 0;
    /** @type {NodeList} */
    let carouselIndicators = document.querySelectorAll('.carousel-costs__indicators-item');
    let carouselInterval = setInterval(() => {
      /** @type {HTMLUListElement} */
      let carouselSlidesListElement = carouselElement.querySelector('.carousel-costs__slides-list');
      /** @type {NodeList} */
      let carouselSlidesElementsList = carouselSlidesListElement.querySelectorAll('.carousel-costs__slide');
      /** @type {Number} */
      let carouselSlidesElementsCount = carouselSlidesElementsList.length;
      /** @type {HTMLLinkElement} */
      let carouselFirstSlideElement = carouselSlidesElementsList[0];
      /** @type {Object} */
      let carouselFirstSlideElementStyle = carouselFirstSlideElement.currentStyle || window.getComputedStyle(carouselFirstSlideElement);

      /** @type {Number} */
      let slideStyleMarginLeft = parseInt(carouselFirstSlideElementStyle.marginLeft);
      if ((slideStyleMarginLeft * -1) < ((carouselSlidesElementsCount - 1) * parseInt(carouselFirstSlideElement.offsetWidth))) {
        // Иммитация клика по парвой кнопке слайдера
        $(carouselControllers[1]).trigger('click');
        carouselIndicatorIndex++;
      } else {
        carouselFirstSlideElement.style.marginLeft = 0;
        carouselIndicatorIndex = 0;
      }
      
      for (let indicatorIndex = 0; indicatorIndex < carouselIndicators.length; indicatorIndex++) {
        if (indicatorIndex == carouselIndicatorIndex) {
          carouselIndicators[indicatorIndex].classList.add('carousel-costs__indicators-item_is-active');
        } else {
          carouselIndicators[indicatorIndex].classList.remove('carousel-costs__indicators-item_is-active');
        }
      }
    }, 10000);
  }
}