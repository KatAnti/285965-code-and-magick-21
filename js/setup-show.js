'use strict';

(() => {
  const ESCAPE = `Escape`;
  const ENTER = `Enter`;
  const userDialogOpen = document.querySelector(`.setup-open`);
  const userDialogClose = document.querySelector(`.setup-close`);
  const userDialogPlayerName = document.querySelector(`input[name="username"]`);
  const onPopupEscPress = (evt) => {
    if (evt.key === ESCAPE && userDialogPlayerName !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = () => {
    window.util.dialog.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () => {
    window.util.dialog.classList.add(`hidden`);
    window.util.dialog.style = ``;
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  userDialogOpen.addEventListener(`click`, () => {
    openPopup();
  });

  userDialogOpen.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER) {
      openPopup();
    }
  });

  userDialogClose.addEventListener(`click`, () => {
    closePopup();
  });

  userDialogClose.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER) {
      closePopup();
    }
  });
})();
