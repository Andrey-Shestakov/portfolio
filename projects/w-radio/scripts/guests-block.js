'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  let guestsCategories = document.querySelectorAll('.main__section-guests-category');
  for (let guestsCategory of guestsCategories) {
    let guestsCategoryButton = guestsCategory.querySelector('.main__section-guests-category-header');
    guestsCategoryButton.addEventListener('click', (event) => {
      guestsCategory.classList.toggle('main__section-guests-category_is-open');
    });
  }

  let guestButtons = document.querySelectorAll('.main__section-guest-button');
  for (let guestButton of guestButtons) {
    guestButton.addEventListener('click', (event) => {
      let guestBlock = document.querySelector('.main__section-guest-selected-block');
      let guestBlockData = document.querySelector('.main__section-guest-selected-data');
      
      let guestBlockImage = document.querySelector('.main__section-guest-selected-image');
      switch (guestButton.getAttribute('data-guest-index')) {
        case '5': guestBlockImage.style.backgroundImage = 'url(\'./images/guest-0.png\')'; break;
        default: guestBlockImage.style.backgroundImage = 'none';
      }
      
      let guestBlockImagePlug = document.querySelector('.main__section-guest-selected-plug');
      if (guestBlockImage.style.backgroundImage == 'none') {
        guestBlockImagePlug.style.display = 'block';
      } else {
        guestBlockImagePlug.style.display = 'none';
      }

      let guestTitle = document.querySelector('.main__section-guest-selected-title');
      guestTitle.innerHTML = guestButton.innerHTML;

      let guestDescription = document.querySelector('.main__section-guest-selected-description');
      switch (guestButton.getAttribute('data-guest-index')) {
        case '5': guestDescription.innerHTML = 'Российский искусствовед, арт-критик, куратор выставок, дизайнер, кандидат культурологии. Арт-критик газеты &laquo;Коммерсантъ&raquo;. Ведёт активную блогерскую деятельность как куратор музея &laquo;Гараж&raquo;, коим является с&nbsp;2016&nbsp;года.'; break;
        default: guestDescription.innerHTML = 'Нет описания :(';
      }

      guestBlockData.classList.add('main__section-guest-selected-data_is-showed');
    });
  }
});