/**
 * The current state of sound (enabled or disabled).
 * @type {boolean}
 */
let soundsEnabled = JSON.parse(localStorage.getItem('soundsEnabled')) ?? true;

/**
 * Array to hold all audio elements used in the game.
 * @type {HTMLAudioElement[]}
 */
let soundElements = [];
/**
 * Loads registered sounds from localStorage.
 */
function loadStoredSounds() {
    const storedSounds = JSON.parse(localStorage.getItem('soundPaths')) || [];
    storedSounds.forEach((path) => {
        const audio = new Audio(path);
        registerSound(audio);
    });
}

/**
 * Adds a sound to the list of managed sounds.
 * @param {HTMLAudioElement} audioElement - The audio element to manage.
 */
function registerSound(audioElement) {
    soundElements.push(audioElement);
    audioElement.volume = soundsEnabled ? 1 : 0;

    // Falls Sound noch nicht im LocalStorage gespeichert ist
    let storedPaths = JSON.parse(localStorage.getItem('soundPaths')) || [];
    if (!storedPaths.includes(audioElement.src)) {
        storedPaths.push(audioElement.src);
        localStorage.setItem('soundPaths', JSON.stringify(storedPaths));
    }
}

/**
 * Toggles the sound settings for the application.
 */
function toggleSounds() {
    soundsEnabled = !soundsEnabled;
    localStorage.setItem('soundsEnabled', JSON.stringify(soundsEnabled));

    // Update all registered sounds
    soundElements.forEach((audioElement) => {
        audioElement.volume = soundsEnabled ? 1 : 0;
    });

    // Hintergrundmusik steuern
    if (soundsEnabled) {
        audio.play().catch(err => console.warn("Audio play blocked:", err));
    } else {
        audio.pause();
    }

    updateSoundButtonIcon();
}

/**
 * Updates the sound button's icon based on the current sound state.
 */
function updateSoundButtonIcon() {
    const soundButton = document.getElementById('soundButton');
    if (soundButton) {
        const img = soundButton.querySelector('img');
        if (img) {
            img.src = soundsEnabled
                ? './img/debugger/buttons/button_audio.png'
                : './img/debugger/buttons/button_no_audio.png';
        }
    }
}

/**
 * Initializes sound settings on page load.
 */
document.addEventListener('DOMContentLoaded', () => {
        loadStoredSounds();  // Lädt die gespeicherten Sounds aus dem localStorage
    
        // Die Lautstärke jedes Sound-Elements basierend auf dem gespeicherten Wert anpassen
        soundElements.forEach(audioElement => {
            audioElement.volume = soundsEnabled ? 1 : 0;  // Lautstärke je nach Zustand einstellen
        });
    
        // Icon des Sound-Buttons anpassen
        updateSoundButtonIcon();
    
        // Sicherstellen, dass der Sound beim ersten Klick freigegeben wird, wenn er zuvor blockiert war
        const soundButton = document.getElementById('soundButton');
        soundButton.addEventListener('click', () => {
            if (!audio.paused && soundsEnabled) {  // Überprüfen, ob der Sound wiedergegeben wird
                audio.play().catch(err => console.warn("Audio play blocked:", err));  // Sound starten
            }
        });
    });
    



