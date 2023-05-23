'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  new JustValidate('.main__section-about-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10
      },
      mail: {
        required: true,
        email: true
      },
      what: {
        required: true,
        minLength: 10,
      }
    },
    messages: {
      name: 'Ошибка',
      email: 'Ошибка',
      what: 'Ошибка'
    }
  });

  new JustValidate('.window__content-form', {
    rules: {
      login: {
        required: true
      },
      password: {
        required: true
      }
    },
    messages: {
      login: 'Ошибка',
      password: 'Ошибка'
    }
  });
});