let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  bindBtnEvents();

  console.log('My character is', world.character);
}

function bindBtnEvents() {
  document.getElementById('leftButton').addEventListener('touchstart', () => {
    keyboard.LEFT = true;
  });

  document.getElementById('leftButton').addEventListener('touchend', () => {
    keyboard.LEFT = false;
  });

  document.getElementById('rightButton').addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
  });

  document.getElementById('rightButton').addEventListener('touchend', () => {
    keyboard.RIGHT = false;
  });

  document.getElementById('jumpButton').addEventListener('touchstart', () => {
    keyboard.SPACE = true;
  });

  document.getElementById('jumpButton').addEventListener('touchend', () => {
    keyboard.SPACE = false;
  });

  document.getElementById('fireButton').addEventListener('touchstart', () => {
    keyboard.D = true;
  });

  document.getElementById('fireButton').addEventListener('touchend', () => {
    keyboard.D = false;
  });
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  } 
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  } 
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});