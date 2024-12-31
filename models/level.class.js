class Level {
    enemies;
    clouds;
    coins;
    sprays;
    backgroundObjects;
    plattform;
    level_end_x = 720*10;

    constructor(enemies, clouds, coins, sprays, backgroundObjects, plattform) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.sprays = sprays;
        this.backgroundObjects = backgroundObjects;
        this.plattform = plattform;
    }
}