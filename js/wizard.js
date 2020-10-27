'use strict';

const userDialogPlayer = document.querySelector(`.setup-player`);
const coatColorInput = userDialogPlayer.querySelector(`input[name="coat-color"]`);
const eyesColorInput = userDialogPlayer.querySelector(`input[name="eyes-color"]`);
const fireballColorInput = userDialogPlayer.querySelector(`input[name="fireball-color"]`);

let wizard = {
  onEyesChange: () => {},
  onCoatChange: () => {}
};

const changeFeatureColor = (evt, newColor, input) => {
  if (evt.target.matches(`.setup-fireball`)) {
    evt.target.style.backgroundColor = newColor;
  } else {
    evt.target.style.fill = newColor;
  }
  input.value = newColor;
  return newColor;
};

userDialogPlayer.addEventListener(`click`, (evt) => {
  if (evt.target && evt.target.matches(`.setup-wizard .wizard-coat`)) {
    const newColor = changeFeatureColor(evt, window.util.getFeature(window.util.coatColors), coatColorInput);
    wizard.onCoatChange(newColor);
  }

  if (evt.target && evt.target.matches(`.setup-wizard .wizard-eyes`)) {
    const newColor = changeFeatureColor(evt, window.util.getFeature(window.util.eyesColors), eyesColorInput);
    wizard.onEyesChange(newColor);
  }

  if (evt.target && evt.target.matches(`.setup-fireball`)) {
    changeFeatureColor(evt, window.util.getFeature(window.util.fireballColors), fireballColorInput);
  }
});

window.wizard = {
  setCoatChangeHandler: (cb) => {
    wizard.onCoatChange = cb;
  },

  setEyesChangeHandler: (cb) => {
    wizard.onEyesChange = cb;
  }
};
