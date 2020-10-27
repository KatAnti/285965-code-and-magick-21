'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const SHADOW_SHIFT = 10;
const TEXT_LINE_HEIGHT = 20;
const TEXT_SHIFT = 15;
const FONT = `16px PT Mono`;
const TITLE = `Ура вы победили! \nСписок результатов: `;
const TITLE_Y = 20;
const TITLE_X = 30;
const statParams = {
  topGap: 85,
  barMaxHeight: 150,
  barWidth: 40,
  gap: 50,
  currentPlayerColor: `rgba(255, 0, 0, 1)`,
};

const drawRect = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const renderCloud = (ctx, color, shadow) => {
  ctx.fillStyle = shadow;
  drawRect(ctx, CLOUD_X + SHADOW_SHIFT, CLOUD_Y + SHADOW_SHIFT, CLOUD_WIDTH, CLOUD_HEIGHT);

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

const getRandomBlueColor = () => {
  return `hsl(237, ${window.util.getRandom(10, 70)}%, ${window.util.getRandom(10, 70)}%)`;
};

const renderTitle = (ctx, x, y, text) => {
  const titleLines = text.split(`\n`);
  titleLines.forEach((line) => {
    drawText(ctx, x, y, line);
    y += TEXT_LINE_HEIGHT;
  });
};

window.renderStatistics = function (ctx, names, times) {
  const MAX_TIME = findMaxTime(times);
  let startX = CLOUD_X + statParams.gap;
  let startY = CLOUD_Y + statParams.topGap;

  renderCloud(ctx, `#fff`, `rgba(0, 0, 0, 0.7)`);
  renderTitle(ctx, CLOUD_X + TITLE_X, CLOUD_Y + TITLE_Y, TITLE);

  names.forEach((player, index) => {
    const isCurrentPlayer = (player === `Вы`);
    const barHeight = (statParams.barMaxHeight * times[index]) / MAX_TIME;
    const barY = startY + (statParams.barMaxHeight - barHeight);

    ctx.fillStyle = isCurrentPlayer ? statParams.currentPlayerColor : getRandomBlueColor();

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
        CLOUD_HEIGHT - TEXT_SHIFT,
        player
    );
    drawText(
        ctx,
        startX,
        barY - TEXT_SHIFT,
        Math.round(times[index])
    );

    startX += statParams.barWidth + statParams.gap;
  });
};
