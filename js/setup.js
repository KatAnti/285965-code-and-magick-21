'use strict';

const WIZARD_AMOUNT = 4;
const userDialog = document.querySelector(`.setup`);
const similarWizards = document.querySelector(`.setup-similar`);
const similarWizardsContainer = document.querySelector(`.setup-similar-list`);
const userDialogOpen = document.querySelector(`.setup-open`);
const userDialogClose = document.querySelector(`.setup-close`);
const userDialogPlayer = document.querySelector(`.setup-player`);
const userDialogPlayerName = document.querySelector(`input[name="username"]`);
const fragment = document.createDocumentFragment();
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
const wizards = [];

const NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const getRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomFeature = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};

const createWizard = () => {
  return {
    name: getRandomFeature(NAMES),
    surname: getRandomFeature(SURNAMES),
    coatColor: getRandomFeature(COAT_COLORS),
    eyesColor: getRandomFeature(EYES_COLORS)
  };
};

const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  const wizardCoat = wizardElement.querySelector(`.wizard-coat`);
  const wizardEyes = wizardElement.querySelector(`.wizard-eyes`);
  const wizardName = wizardElement.querySelector(`.setup-similar-label`);

  wizardEyes.style.fill = wizard.eyesColor;
  wizardCoat.style.fill = wizard.coatColor;
  wizardName.textContent = wizard.name + ` ` + wizard.surname;

  return wizardElement;
};

const appendWizards = (wizardsArr) => {
  wizardsArr.forEach((wizard) => {
    fragment.append(renderWizard(wizard));
  });
  similarWizardsContainer.append(fragment);
};

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && userDialogPlayerName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  userDialog.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  userDialog.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

similarWizards.classList.remove(`hidden`);

for (let i = 0; i < WIZARD_AMOUNT; i++) {
  wizards.push(createWizard());
}

appendWizards(wizards);

userDialogOpen.addEventListener(`click`, () => {
  openPopup(userDialog);
});

userDialogOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup(userDialog);
  }
});

userDialogClose.addEventListener(`click`, () => {
  closePopup(userDialog);
});

userDialogClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup(userDialog);
  }
});

userDialogPlayer.addEventListener(`click`, (evt) => {
  let newColor;

  if (evt.target && evt.target.matches(`.setup-wizard .wizard-coat`)) {
    newColor = getRandomFeature(COAT_COLORS);
    evt.target.style.fill = newColor;
    userDialogPlayer.querySelector(`input[name="coat-color"]`).value = newColor;
  }

  if (evt.target && evt.target.matches(`.setup-wizard .wizard-eyes`)) {
    newColor = getRandomFeature(EYES_COLORS);
    evt.target.style.fill = newColor;
    userDialogPlayer.querySelector(`input[name="eyes-color"]`).value = newColor;
  }

  if (evt.target && evt.target.matches(`.setup-fireball`)) {
    newColor = getRandomFeature(FIREBALL_COLORS);
    evt.target.style.backgroundColor = newColor;
    userDialogPlayer.querySelector(`input[name="fireball-color"]`).value = newColor;
  }
});
