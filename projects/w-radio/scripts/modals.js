'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  let modalsWrapper = document.querySelector('.modal-window-wrapper');
  let modalCallbacks = document.querySelectorAll('[data-modal-id]');
  for (let modalCallback of modalCallbacks) {
    let modalElementID = modalCallback.getAttribute('data-modal-id');
    let modalElement = document.querySelector(`#${modalElementID}`);
    let modalButtonClose = modalElement.querySelector('.modal-window__button');

    modalCallback.addEventListener('click', (event) => {
      modalElement.classList.add('modal-window_is-show');
      modalsWrapper.classList.add('modal-window-wrapper_is-show');
    });

    modalButtonClose.addEventListener('click', (event) => {
      modalElement.classList.remove('modal-window_is-show');
      modalsWrapper.classList.remove('modal-window-wrapper_is-show');
    });
  }
});