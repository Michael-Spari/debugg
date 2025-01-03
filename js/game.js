let canvas;
let world;
let keyboard = new Keyboard();
let audio = new Audio('./audio/background2.mp3');

function initGame() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function initUI() {
  bindBtnEvents();
  showMobileControls();
}

window.onload = () => {
  initUI();
  initGame();
  showMobileControls();
};

window.addEventListener('resize', () => {
  showMobileControls();
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired.');
  showMobileControls();
});

function showMobileControls() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
                   || window.innerWidth <= 700; // Prüfen auf kleinere Bildschirmgrößen
  if (isMobile) {
    document.getElementById('leftButton').style.display = 'block';
    document.getElementById('rightButton').style.display = 'block';
    document.getElementById('jumpButton').style.display = 'block';
    document.getElementById('fireButton').style.display = 'block';
    // document.getElementById('leftRightButtons').style.display = 'flex';
    // document.getElementById('jumpFireButtons').style.display = 'flex';
  } 
  else {
    document.getElementById('leftButton').style.display = 'none';
    document.getElementById('rightButton').style.display = 'none';
    document.getElementById('jumpButton').style.display = 'none';
    document.getElementById('fireButton').style.display = 'none';
    // document.getElementById('leftRightButtons').style.display = 'none';
    // document.getElementById('jumpFireButtons').style.display = 'none';
  }
}

function fullScreen() {
  let fullscreen = document.getElementById('fullscreen');
  enterFullscreen(fullscreen);
}

function togglePlayPauseAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
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

function enterFullscreen(document) {
  if (document.requestFullscreen) {
    document.requestFullscreen();
  } else if (document.mozRequestFullScreen) {
    document.mozRequestFullScreen();
  } else if (document.webkitRequestFullscreen) {
    document.webkitRequestFullscreen();
  } else if (document.msRequestFullscreen) {
    document.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {    
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
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
