'use strict';

class Modal {
  constructor(label) {
    this.setLabel(label);
    this.init();

    Debugger.log('Модальное окно создано.');
  }

  /**
   * Назначение подписи для модального окна
   * @param {HTMLFormElement} element 
   */
  setLabel(label) {
    this.label = label;
  }

  /**
   * Получение подписи для модального окна
   * @param {HTMLFormElement} element 
   */
  getLabel() {
    return this.label;
  }

  /**
   * Инициализация модального окна
   */
  init() {
    /** @type {HTMLElement} */
    let modalWrapperElement = document.createElement('div');
    modalWrapperElement.classList.add('modal-wrapper');
    /** @type {HTMLElement} */
    let modalBlockElement = document.createElement('div.modal');
    modalBlockElement.classList.add('modal');
    /** @type {HTMLElement} */
    let modalBlockLabelElement = document.createElement('p');
    modalBlockLabelElement.classList.add('modal__description');
    modalBlockLabelElement.innerText = this.getLabel();
    
    /** @type {HTMLElement} */
    let modalBlockCloseElement = document.createElement('button');
    modalBlockCloseElement.classList.add('modal__button-close');
    modalBlockCloseElement.innerText = 'Понятно';

    // Убираем модальное окно при клике
    modalBlockCloseElement.addEventListener('click', (event) => {
      modalWrapperElement.remove();
      delete this;
    });

    modalBlockElement.appendChild(modalBlockLabelElement);
    modalBlockElement.appendChild(modalBlockCloseElement);
    modalWrapperElement.appendChild(modalBlockElement);
    document.body.prepend(modalWrapperElement);
  }
}