let canvas;
let world;
let keyboard = new Keyboard();
let audio = new Audio('./audio/background2.mp3');

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  bindBtnEvents();

  console.log('My character is', world.character);
}

function togglePlayPauseAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function fullScreen() {
  let fullscreen = document.getElementById('fullscreen');
  enterFullscreen(fullscreen);
}

function toggleHowToPlay() {
  let howToPlay = document.getElementById('howToPlay');
  let mission = document.getElementById('mission');
  if (howToPlay.style.display === 'none') {
    howToPlay.style.display = 'flex';
    mission.style.display = 'none';
  } else {
    howToPlay.style.display = 'none';
  }
}

function toggleMission() {
  let mission = document.getElementById('mission');
  let howToPlay = document.getElementById('howToPlay');
  if (mission.style.display === 'none') {
    mission.style.display = 'flex';
    howToPlay.style.display = 'none';
  } else {
    mission.style.display = 'none';
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
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

  document.getElementById('startButton').addEventListener('touchstart', () => {
    init();
  });

  document.getElementById('startButton').addEventListener('touchend', () => {
    init();
  });

  document.getElementById('fullscreenButton').addEventListener('touchstart', () => {
    fullScreen();
  });

  document.getElementById('fullscreenButton').addEventListener('touchend', () => {
    fullScreen();
  });

  document.getElementById('fullscreenEndButton').addEventListener('touchstart', () => {
    exitFullscreen();
  });

  document.getElementById('fullscreenEndButton').addEventListener('touchend', () => {
    exitFullscreen();
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