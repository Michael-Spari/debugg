/**
 * The current state of sound (enabled or disabled).
 * @type {boolean}
 */
let soundsEnabled = true;

/**
 * Array to hold all audio elements used in the game.
 * @type {HTMLAudioElement[]}
 */
let soundElements = [];

/**
 * Adds a sound to the list of managed sounds.
 * @param {HTMLAudioElement} audioElement - The audio element to manage.
 */
function registerSound(audioElement) {
  soundElements.push(audioElement);
}

/**
 * Toggles all sounds on or off.
 */
function toggleSounds() {
  soundsEnabled = !soundsEnabled;

  // Toggle mute for all registered sounds
  soundElements.forEach((audioElement) => {
    audioElement.muted = !soundsEnabled;
  });
}
