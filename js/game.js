let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);

  console.log('My character is', world.character);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 39) {
    keyboard.RIGHT = true;
  } 
  if (e.code === 37) {
    keyboard.LEFT = true;
  }
  if (e.code === 38) {
    keyboard.UP = true;
  }
  if (e.code === 40) {
    keyboard.DOWN = true;
  }
  if (e.code === 32) {
    keyboard.SPACE = true;
  }
  console.log(e);
});