'use strict';

const Game = require('../modules/Game.class');
const game = new Game('idle');

const startButton = document.querySelector('.start');
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');
const startMessage = document.querySelector('.message-start');
const score = document.querySelector('.game-score');

document.addEventListener('DOMContentLoaded', () => {
  game.beforeStart();
});

startButton.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'Start') {
    startMessage.classList.add('hidden');
    e.target.innerHTML = 'Restart';
    e.target.classList.remove('start');
    e.target.classList.add('restart');
  } else {
    startMessage.classList.remove('hidden');
    e.target.innerHTML = 'Start';
    e.target.classList.remove('restart');
    e.target.classList.add('start');
    game.score = 0;
    score.innerHTML = 0;
    game.restart();
  }
});

function checkStatus() {
  if (game.getStatus() === 'win') {
    winMessage.classList.remove('hidden');
  }

  if (game.getStatus() === 'lose') {
    loseMessage.classList.remove('hidden');
  }
}

export const control = (e) => {
  if (e.key && !startMessage.classList.contains('hidden')) {
    startMessage.classList.add('hidden');
    startButton.innerHTML = 'Restart';
    startButton.classList.remove('start');
    startButton.classList.add('restart');
  }

  if (e.key === 'ArrowRight') {
    game.moveRight();
    game.combineRow();
    game.moveRight();

    if (game.initialState === 'lose') {
      loseMessage.classList.remove('hidden');

      return;
    }
    game.generate();
    game.addColors();

    checkStatus();
  }

  if (e.key === 'ArrowLeft') {
    game.moveLeft();
    game.combineRow();
    game.moveLeft();
    game.generate();
    game.addColors();

    checkStatus();
  }

  if (e.key === 'ArrowUp') {
    game.moveUp();
    game.combineColumn();
    game.moveUp();
    game.generate();
    game.addColors();

    checkStatus();
  }

  if (e.key === 'ArrowDown') {
    game.moveDown();
    game.combineColumn();
    game.moveDown();
    game.generate();
    game.addColors();

    checkStatus();
  }
};

document.addEventListener('keydown', control);
