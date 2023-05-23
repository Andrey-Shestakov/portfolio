'use strict';

// После полной загрузки документа создаем экземпляры класса Form
document.addEventListener('DOMContentLoaded', (event) => {
  Debugger.log('Поиск форм...');
  let formsElements = document.querySelectorAll('form');
  for (let formElement of formsElements) {
    let form = new Form(formElement);
  }
  Debugger.log('Поиск форм завершен.');
});