'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  let headerNavigationBurderButtons = document.querySelectorAll('.header__top-navigation-burger-button');
  let headerNavigation = document.querySelector('.header__top-navigation');
  let headerSubNavigation = document.querySelector('.header__bottom-navigation');

  for (let headerNavigationBurderButton of headerNavigationBurderButtons) {
    headerNavigationBurderButton.addEventListener('click', (event) => {
      headerNavigation.classList.toggle('header__top-navigation_is-dropdown');
      headerNavigation.classList.toggle('container');

      headerSubNavigation.classList.toggle('header__bottom-navigation_is-dropdown');
      headerSubNavigation.classList.toggle('container');
    });
  }

  // Скрытие бургера при переходе в десктопный вариант
  window.addEventListener("resize", (event) => {
    if (window.screen.width > 1100) {
      headerNavigation.classList.remove('header__top-navigation_is-dropdown');
      headerNavigation.classList.remove('container');

      headerSubNavigation.classList.remove('header__bottom-navigation_is-dropdown');
      headerSubNavigation.classList.remove('container');
    }
  });
});