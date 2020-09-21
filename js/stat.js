'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const FONT = `16px PT Mono`;
const TITLE = `Ура вы победили! \nСписок результатов: `;

const drawRect = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const renderCloud = (ctx, color, shadow) => {
  ctx.fillStyle = shadow;
  drawRect(ctx, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = color;
  drawRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const drawText = (ctx, x, y, text) => {
  ctx.fillStyle = `black`;
  ctx.textBaseline = `hanging`;
  ctx.font = FONT;
  ctx.fillText(text, x, y);
};

const findMaxTime = (times) => {
  let maxTime = times[0];

  times.forEach((time) => {
    if (maxTime < time) {
      maxTime = time;
    }
  });

  return maxTime;
};

const getRandomNumber = (min, max) => {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const renderTitle = (ctx, x, y, text) => {
  const titleLines = text.split(`\n`);
  titleLines.forEach((line) => {
    drawText(ctx, x, y, line);
    y += 20;
  });
};

window.renderStatistics = function (ctx, names, times) {
  const MAX_TIME = findMaxTime(times);
  const statParams = {
    barMaxHeight: 150,
    barWidth: 40,
    gap: 50,
    currentPlayerColor: `rgba(255, 0, 0, 1)`
  };

  let startX = CLOUD_X + statParams.gap;
  let startY = CLOUD_Y + 85;

  renderCloud(ctx, `#fff`, `rgba(0, 0, 0, 0.7)`);
  renderTitle(ctx, CLOUD_X + 30, CLOUD_Y + 20, TITLE);

  names.forEach((player, index) => {
    const isCurrentPlayer = (player === `Вы`);
    const barHeight = (statParams.barMaxHeight * times[index]) / MAX_TIME;
    const barY = startY + (statParams.barMaxHeight - barHeight);

    ctx.fillStyle = isCurrentPlayer ? statParams.currentPlayerColor : `hsl(237, ${getRandomNumber(10, 70)}%, ${getRandomNumber(10, 70)}%)`;

    drawRect(
        ctx,
        startX,
        barY,
        statParams.barWidth,
        barHeight
    );
    drawText(
        ctx,
        startX,
        CLOUD_HEIGHT - 15,
        player
    );
    drawText(
        ctx,
        startX,
        barY - 15,
        Math.round(times[index])
    );

    startX += statParams.barWidth + statParams.gap;
  });
};
