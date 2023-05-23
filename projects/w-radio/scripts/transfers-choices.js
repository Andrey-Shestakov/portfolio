'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  let selectCustom = document.querySelector('#selectAuthor');
  let choices = new Choices(selectCustom, {
    searchEnabled: false,
    shouldSort: false,
    position: 'bottom',
    searchEnabled: false,
    itemSelectText: ''
  });
});