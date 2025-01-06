/**
 * Level 1 configuration for the game.
 * Contains the elements of the level such as enemies, clouds, coins, sprays, background objects, platforms, and commands.
 */
const level1 = new Level(
    /**
     * List of enemies in the level.
     * Includes multiple Bug enemies and Endbosses.
     * @type {Array}
     */
    [
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Bug(),
      new Endboss(),
      new Endboss(),
      new Endboss(),
      new Endboss(),
      new Endboss(),
      new Endboss(),
    ],
  
    /**
     * List of clouds in the level.
     * Adds multiple cloud objects for the background.
     * @type {Array}
     */
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ],
  
    /**
     * List of coins in the level.
     * Adds a single coin collectible.
     * @type {Array}
     */
    [
      new Coin(),
    ],
  
    /**
     * List of sprays (throwable objects) in the level.
     * Adds a single spray.
     * @type {Array}
     */
    [
      new Spray(),
    ],
  
    /**
     * List of background objects in the level.
     * Includes layered backgrounds to create the visual environment.
     * @type {Array}
     */
    [
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_1.png', 0, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_1.png', 719, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_1.png', 719 * 2, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller.png', 719 * 3, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller_1.png', 719 * 4, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller_11.png', 719 * 5, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller_22.png', 719 * 6, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller_23.png', 719 * 6, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller_33.png', 719 * 7, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller_44.png', 719 * 8, 0),
      new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller_55.png', 719 * 9, 0),
    ],
  
    /**
     * List of platforms in the level.
     * Includes a single platform for interaction.
     * @type {Array}
     */
    [
      new Plattform(),
    ],
  
    /**
     * List of commands or special objects in the level.
     * Includes a single command object.
     * @type {Array}
     */
    [
      new Comando(),
    ],
  );
  