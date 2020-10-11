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
  const form = document.querySelector(`.setup-wizard-form`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    const wizardCoat = wizardElement.querySelector(`.wizard-coat`);
    const wizardEyes = wizardElement.querySelector(`.wizard-eyes`);
    const wizardName = wizardElement.querySelector(`.setup-similar-label`);

    wizardEyes.style.fill = wizard.colorEyes;
    wizardCoat.style.fill = wizard.colorCoat;
    wizardName.textContent = wizard.name;

    return wizardElement;
  };

  const changeFeatureColor = (evt, newColor, input) => {
    if (evt.target.matches(`.setup-fireball`)) {
      evt.target.style.backgroundColor = newColor;
    } else {
      evt.target.style.fill = newColor;
    }
    input.value = newColor;
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    window.backend.save(new FormData(form), () => {
      window.util.dialog.classList.add(`hidden`);
    }, errorHandler);
  };

  const successHandler = function (wizards) {
    const randomWizards = [];

    for (let i = 0; i < WIZARD_AMOUNT; i++) {
      randomWizards.push(window.util.getRandom(0, wizards.length - 1));
    }

    randomWizards.forEach((wizardIndex) => {
      fragment.appendChild(renderWizard(wizards[wizardIndex]));
    });

    similarWizardsContainer.appendChild(fragment);

    similarWizards.classList.remove(`hidden`);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
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

  window.backend.load(successHandler, errorHandler);

  form.addEventListener(`submit`, onSubmitHandler);
})();
