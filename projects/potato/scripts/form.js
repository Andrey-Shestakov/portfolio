'use strict';

class Form {
  constructor(element) {
    this.setElement(element);
    this.init();

    Debugger.log('Форма создана.');
  }

  /**
   * Назначение DOM-элемента формы
   * @param {HTMLFormElement} element 
   */
  setElement(element) {
    this.element = element;
  }

  /**
   * Получение DOM-элемента формы
   * @returns {HTMLFormElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Инициализация формы
   */
  init() {
    let inputs = this.element.querySelectorAll('input');
    for (let input of inputs) {
      input.addEventListener('invalid', (event) => {
        if (input.value != '') {
          let regex = new RegExp(input.getAttribute('pattern'));

          if (!regex.test(input.value)) {
            input.classList.add('form-callback__input_not-valid');

            /** @type {string} */
            let modalMessage;
            if (input.classList.contains('form-callback__input_text')) {
              modalMessage = 'Ошибка формата: имя должно включать в себя буквы кириллицы или латинского алфавита.';
            } else if (input.classList.contains('form-callback__input_tel')) {
              modalMessage = 'Ошибка формата: номер телефона должен соответствовать формату: +7XXXXXXXXXX';
            } else {
              modalMessage = 'Ошибка формата: проверьте правильность ввода данных.';
            }
            /** @type {NodeList} */
            let modals = document.querySelectorAll('.modal');
            if (modals.length == 0) {
              /** @type {Modal} */
              let modal = new Modal(modalMessage);
            }
          }
        } else {
          /** @type {string} */
          let modalMessage = 'Обязательное поле не может быть пустым.';
          /** @type {NodeList} */
          let modals = document.querySelectorAll('.modal');
          if (modals.length == 0) {
            /** @type {Modal} */
            let modal = new Modal(modalMessage);
          }
        }
      });
    }
    
    // Добавляем событие клика для кнопки главной формы
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();

      // Убираем классы "form-callback__input_not-valid" у всех полей
      for (let input of inputs) {
        input.classList.remove('form-callback__input_not-valid');
      }

      // Отправляем форму
      this.send();
    });
  }

  /**
   * Отправка формы
   */
  send() {
    /** @type {HTMLFormElement} */
    let formElement = this.getElement();
    /** @type {FormData} */
    let formData = new FormData(formElement);

    $.ajax({
      method: formElement.getAttribute('method'),
      url: formElement.getAttribute('action'),
      data: formData,
      cache: false,
      processData: false,
			contentType: false,
      crossDomain: true,
      enctype: 'multipart/form-data',
      success: (data) => {
        Debugger.log('Форма успешно отправлена.');
        
        // Вычищаем значения у всех текстовых полей после отправки формы
        let inputsText = formElement.querySelectorAll('input[type="text"]');
        for (let input of inputsText) {
          input.value = '';
        }

        let inputsTel = formElement.querySelectorAll('input[type="tel"]');
        for (let input of inputsTel) {
          input.value = '';
        }

        /** @type {NodeList} */
        let modals = document.querySelectorAll('.modal');
        if (modals.length == 0) {
          /** @type {Modal} */
          let modal = new Modal('Ваша заявка оставлена.');
        }
      },
      error: (jqXHR) => {
        Debugger.log(`[ERROR: ${jqXHR.status}] ${jqXHR.responseText}`);
      }
    });
  }
}