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
/**
 * Toggles the sound settings for the application.
 * 
 * This function switches the global `soundsEnabled` status and updates all audio elements accordingly.
 * If sounds are disabled, it pauses and resets all audio elements. If sounds are enabled, it resumes
 * the background music from the beginning.
 * 
 * @global {boolean} soundsEnabled - A global variable indicating whether sounds are enabled or not.
 * @global {Array<HTMLAudioElement>} soundElements - An array of all audio elements in the application.
 * @global {HTMLAudioElement} audio - The background music audio element.
 */
function toggleSounds() {
        /* Toggle the soundsEnabled status*/
        soundsEnabled = !soundsEnabled;

        /* Adjust all audio elements globally */
        soundElements.forEach((audioElement) => {
                audioElement.muted = !soundsEnabled; /* Mute or unmute the audio*/
                if (!soundsEnabled) {
                        audioElement.pause(); /* Pause the audio*/
                        audioElement.currentTime = 0; /* Reset to the beginning*/
                }
        });

        /* Handle background music explicitly */
        if (audio) {
                if (soundsEnabled) {
                        audio.play().catch((error) => console.error("Error restarting background music:", error));
                } else {
                        audio.pause();
                        audio.currentTime = 0; /* Reset to the beginning */
                }
        }

        /* Update the button image */
        const soundButton = document.getElementById('soundButton');
        if (soundButton) {
                soundButton.querySelector('img').src = soundsEnabled ? './img/debugger/buttons/button_audio.png' : './img/debugger/buttons/button_no_audio.png';
        }

        console.log(soundsEnabled ? "Sounds enabled" : "Sounds disabled");
}


