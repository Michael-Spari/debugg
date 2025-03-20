/**
 * Represents a game level, containing various elements like enemies, clouds, coins, and more.
 */
class Level {
    /**
     * The enemies present in the level.
     * @type {Array}
     */
    enemies;
  
    /**
     * The clouds in the level's background.
     * @type {Array}
     */
    clouds;
  
    /**
     * The coins available for collection in the level.
     * @type {Array}
     */
    coins;
  
    /**
     * The sprays available as throwable objects in the level.
     * @type {Array}
     */
    sprays;
  
    /**
     * The background objects of the level.
     * @type {Array}
     */
    backgroundObjects;
  
    /**
     * The platforms in the level for player interaction.
     * @type {Array}
     */
    plattform;
  
    /**
     * The command objects or special elements in the level.
     * @type {Array}
     */
    comando;
  
    /**
     * The x-coordinate that defines the end of the level.
     * @type {number}
     */
    level_end_x = 720 * 10;
  
    /**
     * Constructs a new instance of the Level class.
     * @param {Array} enemies - The enemies present in the level.
     * @param {Array} clouds - The clouds in the level's background.
     * @param {Array} coins - The coins available for collection in the level.
     * @param {Array} sprays - The sprays available as throwable objects in the level.
     * @param {Array} backgroundObjects - The background objects of the level.
     * @param {Array} plattform - The platforms in the level for player interaction.
     * @param {Array} comando - The command objects or special elements in the level.
     */
    constructor(enemies, clouds, coins, sprays, backgroundObjects, plattform, comando) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.coins = coins;
      this.sprays = sprays;
      this.backgroundObjects = backgroundObjects;
      this.plattform = plattform;
      this.comando = comando;
    }

        /**
     * Loads all enemies including bugs and endgegner.
     */
        loadEnemies() {
          this.enemies = [
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
          ];
      }
  }
  