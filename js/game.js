/**
 * The canvas element used to draw the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The world object representing the game world.
 * @type {World}
 */
let world;

/**
 * The keyboard object used to handle player input.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * The background music audio object.
 * @type {HTMLAudioElement}
 */
let audio = new Audio('./audio/background2.mp3');

/**
 * Initializes the game by setting up the canvas and world.
 */
function initGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

/**
 * Event listener that triggers when the window is resized.
 * Adjusts mobile controls based on screen size.
 */
window.addEventListener('resize', () => {
  showMobileControls();
});

/**
 * Event listener that triggers when the document is fully loaded.
 * Initializes mobile controls and binds button events.
 */
document.addEventListener('DOMContentLoaded', () => {
  showMobileControls();
  bindBtnEvents();
});

/**
 * Displays mobile controls when the user is on a mobile device or has a small screen.
 */
function showMobileControls() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || window.innerWidth <= 700;
  if (isMobile) {
    document.getElementById('leftButton').style.display = 'block';
    document.getElementById('rightButton').style.display = 'block';
    document.getElementById('jumpButton').style.display = 'block';
    document.getElementById('fireButton').style.display = 'block';
  } 
  else {
    document.getElementById('leftButton').style.display = 'none';
    document.getElementById('rightButton').style.display = 'none';
    document.getElementById('jumpButton').style.display = 'none';
    document.getElementById('fireButton').style.display = 'none';
  }
}

/**
 * Toggles fullscreen mode for the game.
 */
function fullScreen() {
  const fullscreenElement = document.getElementById('fullscreen');
  enterFullscreen(fullscreenElement);
}

/**
 * Attempts to enter fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    console.warn("Fullscreen not supported on this browser.");
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Toggles the play/pause state of the background audio.
 */
function togglePlayPauseAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/**
 * Toggles the visibility of the "How To Play" section.
 */
function toggleHowToPlay() {
  let howToPlay = document.getElementById('howToPlay');
  let mission = document.getElementById('mission');
  let impressum = document.getElementById('impressum');
  if (howToPlay.style.display === 'none') {
    howToPlay.style.display = 'flex';
    mission.style.display = 'none';
    impressum.style.display = 'none';
  } else {
    howToPlay.style.display = 'none';
  }
}

/**
 * Toggles the visibility of the "Mission" section.
 */
function toggleMission() {
  let mission = document.getElementById('mission');
  let howToPlay = document.getElementById('howToPlay');
  let impressum = document.getElementById('impressum');
  if (mission.style.display === 'none') {
    mission.style.display = 'flex';
    howToPlay.style.display = 'none';
    impressum.style.display = 'none';
  } else {
    mission.style.display = 'none';
  }
}

/**
 * Toggles the visibility of the "Impressum" section.
 */
function toggleImpressum() {
  let impressum = document.getElementById('impressum');
  let howToPlay = document.getElementById('howToPlay');
  let mission = document.getElementById('mission');
  if (impressum.style.display === 'none') {
    impressum.style.display = 'flex';
    howToPlay.style.display = 'none';
    mission.style.display = 'none';
  } else {
    impressum.style.display = 'none';
  }
}

/**
 * Binds touch and click events to buttons for controlling the game.
 */
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

  document.getElementById('startButton').addEventListener('click', () => {
    initGame();
  });

  document.getElementById('fullscreenButton').addEventListener('click', () => {
    fullScreen();
  });

  document.getElementById('fullscreenEndButton').addEventListener('click', () => {
    exitFullscreen();
  });
}

/**
 * Handles keyboard events to control the player's actions.
 * @param {KeyboardEvent} e - The keyboard event.
 */
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

/**
 * Handles keyboard events when keys are released.
 * @param {KeyboardEvent} e - The keyboard event.
 */
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

