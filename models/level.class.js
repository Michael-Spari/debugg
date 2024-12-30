class Level {
    enemies;
    clouds;
    coins;
    sprays;
    backgroundObjects;
    level_end_x = 720*10;

    constructor(enemies, clouds, coins, sprays, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.sprays = sprays;
        this.backgroundObjects = backgroundObjects;
    }
}