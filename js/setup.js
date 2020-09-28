'use strict';

const WIZARD_AMOUNT = 4;
const userDialog = document.querySelector(`.setup`);
const similarWizards = document.querySelector(`.setup-similar`);
const similarWizardsContainer = document.querySelector(`.setup-similar-list`);
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

userDialog.classList.remove(`hidden`);
similarWizards.classList.remove(`hidden`);

for (let i = 0; i < WIZARD_AMOUNT; i++) {
  wizards.push(createWizard());
}

appendWizards(wizards);


