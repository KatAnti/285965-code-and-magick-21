'use strict';

(() => {
  const MAX_SIMILAR_WIZARD_COUNT = 4;
  const similarWizards = document.querySelector(`.setup-similar`);
  const similarWizardsContainer = document.querySelector(`.setup-similar-list`);
  const fragment = document.createDocumentFragment();
  const form = document.querySelector(`.setup-wizard-form`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;
  let wizardsList = [];

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

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    window.backend.save(new FormData(form), () => {
      window.util.dialog.classList.add(`hidden`);
    }, errorHandler);
  };

  const renderWizards = (wizards) => {
    const takeNumber = wizards.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : wizards.length;

    similarWizardsContainer.innerHTML = ``;

    for (let i = 0; i < takeNumber; i++) {
      similarWizardsContainer.appendChild(renderWizard(wizards[i]));
    }

    similarWizardsContainer.appendChild(fragment);

    similarWizards.classList.remove(`hidden`);
  };

  const getRank = function (wizard) {
    let rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  const updateWizards = () => {
    renderWizards(wizardsList.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  const successHandler = function (data) {
    wizardsList = data;

    renderWizards(wizardsList);
    updateWizards();
  };

  const errorHandler = function (message) {
    window.util.createErrMessage(message);
  };

  window.backend.load(successHandler, errorHandler);

  form.addEventListener(`submit`, onSubmitHandler);

  window.wizard.setEyesChangeHandler(window.debounce((color) => {
    eyesColor = color;
    updateWizards();
  })
  );

  window.wizard.setCoatChangeHandler(window.debounce((color) => {
    coatColor = color;
    updateWizards();
  })
  );
})();
