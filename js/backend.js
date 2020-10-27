'use strict';

const makeServerRequest = (method, onLoadFn, onErrorFn, data) => {
  const xhr = new XMLHttpRequest();
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT = 10000;
  let url = (method === `POST`) ? `https://21.javascript.pages.academy/code-and-magick` : `https://21.javascript.pages.academy/code-and-magick/data`;

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onLoadFn(xhr.response);
    } else {
      onErrorFn(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onErrorFn(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onErrorFn(`Запрос не успел выполниться за ` + xhr.timeout + `мc`);
  });

  xhr.timeout = TIMEOUT;

  xhr.open(method, url);

  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
};

const loadWizards = (onLoad, onError) => {
  makeServerRequest(`GET`, onLoad, onError);

};

const sendForm = (data, onLoad, onError) => {
  makeServerRequest(`POST`, onLoad, onError, data);
};

window.backend = {
  load: loadWizards,
  save: sendForm
};
