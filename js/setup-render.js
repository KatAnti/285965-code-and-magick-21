'use strict';

(() => {
  const WIZARD_AMOUNT = 4;
  const similarWizards = document.querySelector(`.setup-similar`);
  const similarWizardsContainer = document.querySelector(`.setup-similar-list`);
  const fragment = document.createDocumentFragment();
  const userDialogPlayer = document.querySelector(`.setup-player`);
  const coatColorInput = userDialogPlayer.querySelector(`input[name="coat-color"]`);
  const eyesColorInput = userDialogPlayer.querySelector(`input[name="eyes-color"]`);
  const fireballColorInput = userDialogPlayer.querySelector(`input[name="fireball-color"]`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const wizards = [];

  const createWizard = () => {
    return {
      name: window.util.getFeature(window.util.names),
      surname: window.util.getFeature(window.util.surnames),
      coatColor: window.util.getFeature(window.util.coatColors),
      eyesColor: window.util.getFeature(window.util.eyesColors)
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

  const changeFeatureColor = (evt, newColor, input) => {
    if (evt.target.matches(`.setup-fireball`)) {
      evt.target.style.backgroundColor = newColor;
    } else {
      evt.target.style.fill = newColor;
    }
    input.value = newColor;
  };

  userDialogPlayer.addEventListener(`click`, (evt) => {
    if (evt.target && evt.target.matches(`.setup-wizard .wizard-coat`)) {
      changeFeatureColor(evt, window.util.getFeature(window.util.coatColors), coatColorInput);
    }

    if (evt.target && evt.target.matches(`.setup-wizard .wizard-eyes`)) {
      changeFeatureColor(evt, window.util.getFeature(window.util.eyesColors), eyesColorInput);
    }

    if (evt.target && evt.target.matches(`.setup-fireball`)) {
      changeFeatureColor(evt, window.util.getFeature(window.util.fireballColors), fireballColorInput);
    }
  });

  similarWizards.classList.remove(`hidden`);

  for (let i = 0; i < WIZARD_AMOUNT; i++) {
    wizards.push(createWizard());
  }

  appendWizards(wizards);
})();
