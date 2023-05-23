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
            input.classList.add('application-form__input_not-valid');
            /** @type {string} */
            let modalMessage = 'Ошибка формата: проверьте правильность ввода данных.';
            /** @type {Modal} */
            let modal = new Modal(modalMessage);
          }
        } else {
          /** @type {string} */
          let modalMessage = 'Поле не может быть пустым.';
          /** @type {Modal} */
          let modal = new Modal(modalMessage);
        }
      });
    }
    
    // Добавляем событие клика для кнопки главной формы
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();

      // Убираем классы "application-form__input_not-valid" у всех полей
      for (let input of inputs) {
        input.classList.remove('application-form__input_not-valid');
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
        let inputs = formElement.querySelectorAll('input[type="text"]');
        for (let input of inputs) {
          input.value = '';
        }

        // Если форма относится к целевой (главная форма приложения)
        if (formElement.hasAttribute('data-application-form')) {
          /** @type {JSON} */
          let dataJSON = JSON.parse(data);
          /** @type {HTMLElement} */
          let formResult = document.querySelector('.section__form-result');
          
          if (dataJSON.status == 200) {
            Debugger.log(dataJSON.message);
          } else {
            Debugger.log(`[ERROR: ${dataJSON.status}] ${dataJSON.message}`);
          }
          
          // Если данные об участниках были переданы
          if (typeof(dataJSON.outputData.members) != 'undefined') {
            /** @type {HTMLElement} */
            let formResultTable;
            if (formResult.childNodes.length == 0) {
              /** @type {HTMLTableElement} */
              formResultTable = document.createElement('table');
              formResultTable.classList.add('application-table-container__table');
              formResultTable.classList.add('application-table');
              formResultTable.setAttribute('cellspacing', 0);

              /** @type {HTMLTableRowElement} */
              let headersRowElement = document.createElement('tr');
              headersRowElement.classList.add('application-table__row', 'application-table__row_header');

              /** @type {HTMLTableCellElement} */
              let headerCellIDElement = document.createElement('th');
              headerCellIDElement.setAttribute('data-sort-type', 'number');
              headerCellIDElement.setAttribute('aria-label', 'Сортировка по числовому значению идентификатора участника');
              /** @type {HTMLTableCellElement} */
              let headerCellNameElement = document.createElement('th');
              headerCellNameElement.setAttribute('data-sort-type', 'first-char');
              headerCellNameElement.setAttribute('aria-label', 'Сортировка по текстовому значению имени участника');
              /** @type {HTMLTableCellElement} */
              let headerCellScoresElement = document.createElement('th');
              headerCellScoresElement.setAttribute('data-sort-type', 'number');
              headerCellScoresElement.setAttribute('aria-label', 'Сортировка по числовому значению очков участника');

              // Добавляем необходимые классы к клеткам строки таблицы
              headerCellIDElement.classList.add('application-table__cell', 'application-table__cell_header');
              headerCellNameElement.classList.add('application-table__cell', 'application-table__cell_header');
              headerCellScoresElement.classList.add('application-table__cell', 'application-table__cell_header');

              formResultTable.appendChild(headersRowElement);
              let cellID = headersRowElement.appendChild(headerCellIDElement);
              let cellName = headersRowElement.appendChild(headerCellNameElement);
              let cellScores = headersRowElement.appendChild(headerCellScoresElement);

              // Заполняем ячейки новой строки таблицы
              cellID.innerText = 'ID';
              cellName.innerText = 'Имя';
              cellScores.innerText = 'Очки';

              formResult.appendChild(formResultTable);
              
              /** @type {NodeList} */
              let formResultTableHeadersCells = formResultTable.querySelectorAll('th');
              for (let tableHeaderCellIndex = 0; tableHeaderCellIndex < formResultTableHeadersCells.length; tableHeaderCellIndex++) {
                let tableHeaderCell = formResultTableHeadersCells[tableHeaderCellIndex];
                
                tableHeaderCell.addEventListener('click', (event) => {
                  let tableHeaderCellSortType = tableHeaderCell.getAttribute('data-sort-type');
                  Debugger.log(`Произведена сортировка таблицы по типу: ${tableHeaderCellSortType}`);

                  // ВЫбираем все строки таблицы без учета первой
                  /** @type {NodeList} */
                  let formResultTableRows = formResultTable.querySelectorAll('tr:not(:first-child)');
                  // Преобразовываем объект NodeList в Array для перебора в методе sort
                  /** @type {Array} */
                  let formResultTableRowsSorted = Array.prototype.slice.call(formResultTableRows).sort((rowA, rowB) => {
                    let rowCellsA = rowA.querySelectorAll('td');
                    let rowCellsB = rowB.querySelectorAll('td');

                    /** @type {string} */
                    let rowCellsAInnerText = rowCellsA[tableHeaderCellIndex].innerText;
                    /** @type {string} */
                    let rowCellsBInnerText = rowCellsB[tableHeaderCellIndex].innerText;
                    
                    // Сортировка по алфавиту
                    if (tableHeaderCellSortType == 'first-char') {
                      if (rowCellsAInnerText.toLowerCase() < rowCellsBInnerText.toLowerCase()) {
                        return -1;
                      }
                      if (rowCellsAInnerText.toLowerCase() > rowCellsBInnerText.toLowerCase()) {
                        return 1;
                      }
                    }

                    // Сортировка по числу
                    if (tableHeaderCellSortType == 'number') {
                      if (Number(rowCellsAInnerText) < Number(rowCellsBInnerText)) {
                        return -1;
                      }
                      if (Number(rowCellsAInnerText) > Number(rowCellsBInnerText)) {
                        return 1;
                      }
                    }

                    return 0;
                  });

                  // Удаляем все строки, кроме первой с заголовками
                  for (let formResultTableRow of formResultTableRows) {
                    formResultTableRow.remove();
                  }

                  // Заполняем таблицу отсортированными строками
                  for (let formResultTableRowSorted of formResultTableRowsSorted) {
                    formResultTable.appendChild(formResultTableRowSorted);
                  }
                });
              }

            } else {
              formResultTable = document.querySelector('.application-table-container__table');
            }

            // Перебираем данные по полученным от сервера участников
            for (let member of dataJSON.outputData.members) {
              let formResultTableRowsCount = formResultTable.childNodes.length;

              /** @type {HTMLElement} */
              let memberRowElement = document.createElement('tr');
              memberRowElement.classList.add('application-table__row');

              /** @type {HTMLElement} */
              let memberCellIDElement = document.createElement('td');
              /** @type {HTMLElement} */
              let memberCellNameElement = document.createElement('td');
              /** @type {HTMLElement} */
              let memberCellScoresElement = document.createElement('td');

              // Добавляем необходимые классы к клеткам строки таблицы
              memberCellIDElement.classList.add('application-table__cell');
              memberCellNameElement.classList.add('application-table__cell');
              memberCellScoresElement.classList.add('application-table__cell');

              formResultTable.appendChild(memberRowElement);
              let cellID = memberRowElement.appendChild(memberCellIDElement);
              let cellName = memberRowElement.appendChild(memberCellNameElement);
              let cellScores = memberRowElement.appendChild(memberCellScoresElement);

              // Заполняем ячейки новой строки таблицы
              cellID.innerText = formResultTableRowsCount;
              cellName.innerText = member.name;
              cellScores.innerText = member.scores;
            }
          }
        }
      },
      error: (jqXHR) => {
        Debugger.log(`[ERROR: ${jqXHR.status}] ${jqXHR.responseText}`);
      }
    });
  }
}