'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  let headerRadioBlockButton = document.querySelector('.header__radio-block-mobile-button');
  headerRadioBlockButton.addEventListener('click', (event) => {
    headerRadioBlockButton.classList.toggle('header__radio-block-mobile-button_is-active');

    let headerRadioBlocks = document.querySelectorAll('.header__radio-block-item');
    for (let headerRadioBlock of headerRadioBlocks) {
      headerRadioBlock.classList.toggle('header__radio-block-item_is-mobile-show');
    }
  });

  let radioButtons = document.querySelectorAll('.header__radio-block-button');
  for (let radioButton of radioButtons) {
    radioButton.addEventListener('click', (event) => {
      radioButton.classList.toggle('header__radio-block-button_is-play');
    });
  }

  let radioPodcastsButtons = document.querySelectorAll('.main__section-podcast-button');
  for (let radioPodcastsButton of radioPodcastsButtons) {
    radioPodcastsButton.addEventListener('click', (event) => {
      radioPodcastsButton.classList.toggle('main__section-podcast-button_is-play');
    });
  }

  let podcastsList = document.querySelector('.main__section-podcasts-list');
  let podcastsButton = document.querySelector('.main__section-podcasts-button');

  podcastsButton.addEventListener('click', (event) => {
    podcastsList.classList.toggle('main__section-podcasts-list_is-deployed');
  });
});