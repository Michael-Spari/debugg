/**
 * The canvas element used to draw the game.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The world object representing the game world.
 * @type {any}
 */
let world;

/**
 * The keyboard object used to handle player input
 * @type {any}
 */
let keyboard = new Keyboard();

/* Create and register sounds*/
let audio = new Audio('./audio/background2.mp3');
audio.loop = true;
let SPRAY_SOUND = new Audio('./audio/spray.mp4');
// let SPRAY_SOUND = window.SPRAY_SOUND;
let BIGBUGISHIT_SOUND = new Audio('./audio/bigbughit.mp3');
let DEATHFLY_SOUND = new Audio('./audio/death_fly.mp3');
let WALKING_SOUND = new Audio('./audio/walk.mp4');
let DEATH_SOUND_BUG = new Audio('./audio/splash.mp3');
let DEATH_SOUND_BIGBUG = new Audio('./audio/bugs_sprayed.mp3');
let TYPEWRITER_SOUND = new Audio('audio/typewriter.mp3')
registerSound(audio);
registerSound(SPRAY_SOUND);
registerSound(BIGBUGISHIT_SOUND);
registerSound(DEATHFLY_SOUND);
registerSound(WALKING_SOUND);
registerSound(DEATH_SOUND_BUG);
registerSound(DEATH_SOUND_BIGBUG);

/**
 * Initializes the game by setting up the canvas and world.
 */
function initGame() {
  canvas = document.getElementById('canvas');
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); // Reset canvas
  world = new World(canvas, keyboard);
  document.getElementById('soundButton').style.display = 'block';

  /* Start background music only after user interaction */
  if (soundsEnabled) {
      audio.play().catch(err => console.warn("Audio start prevented by browser:", err));
  }
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
  
  // Event für das Verhindern des Kontextmenüs
  const buttons = document.querySelectorAll('#leftButton, #rightButton, #jumpButton, #fireButton, #fullscreenButton, #fullscreenEndButton, #soundButton');
  buttons.forEach((button) => {
    button.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  });

  // Fullscreen-Button Event-Listener
  const fullscreenButton = document.getElementById('fullscreenButton');
  const fullscreenEndButton = document.getElementById('fullscreenEndButton');
  if (fullscreenButton && fullscreenEndButton) {
    fullscreenButton.addEventListener('click', toggleFullScreen);
    fullscreenEndButton.addEventListener('click', toggleFullScreen);
  }

  // Sound-Button Event-Listener
  const soundButton = document.getElementById('soundButton');
  if (soundButton) {
    soundButton.addEventListener('click', toggleSounds);
  }
});


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
function toggleFullScreen() {
  const fullscreenElement = document.getElementById('fullscreen');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const fullscreenEndButton = document.getElementById('fullscreenEndButton');

  if (!document.fullscreenElement) {
    enterFullscreen(fullscreenElement);
    fullscreenButton.style.display = 'none';
    fullscreenEndButton.style.display = 'block';
  } else {
    exitFullscreen();
    fullscreenButton.style.display = 'block';
    fullscreenEndButton.style.display = 'none';
  }
}

/**
 * Attempts to enter fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => console.warn("Fullscreen request failed:", err));
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen().catch(err => console.warn("Fullscreen request failed:", err));
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen().catch(err => console.warn("Fullscreen request failed:", err));
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen().catch(err => console.warn("Fullscreen request failed:", err));
    }
  } else {
    console.warn("Fullscreen not supported or permissions denied.");
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
    toggleFullScreen();
  });

  document.getElementById('fullscreenEndButton').addEventListener('click', () => {
    toggleFullScreen();
  });
}

/**
 * Handles keyboard events to control the player's actions.
 * @param {KeyboardEvent} e - The keyboard event.
 */
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    keyboard.RIGHT = true;
  } 
  if (e.key === 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (e.key === 'ArrowUp') {
    keyboard.UP = true;
  }
  if (e.key === 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (e.key === ' ') {
    keyboard.SPACE = true;
  }
  if (e.key === 'd') {
    keyboard.D = true;
  }
});

/**
 * Handles keyboard events when keys are released.
 * @param {KeyboardEvent} e - The keyboard event.
 */
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') {
    keyboard.RIGHT = false;
  } 
  if (e.key === 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (e.key === 'ArrowUp') {
    keyboard.UP = false;
  }
  if (e.key === 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if (e.key === ' ') {
    keyboard.SPACE = false;
  }
  if (e.key === 'd') {
    keyboard.D = false;
  }
  
});




