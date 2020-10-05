'use strict';

(() => {
  const dialogHandle = window.util.dialog.querySelector(`.upload`);

  dialogHandle.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let isDragged = false;

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      isDragged = true;

      const shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY,
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.dialog.style.top = (window.util.dialog.offsetTop - shift.y) + `px`;
      window.util.dialog.style.left = (window.util.dialog.offsetLeft - shift.x) + `px`;
    };

    const onMouseup = () => {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseup);

      if (isDragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          document.removeEventListener(`click`, onClickPreventDefault);
        };
        window.util.dialog.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseup);
  });
})();
