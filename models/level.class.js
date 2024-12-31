class Level {
    enemies;
    clouds;
    coins;
    sprays;
    backgroundObjects;
    plattform;
    comando;
    level_end_x = 720*10;

    constructor(enemies, clouds, coins, sprays, backgroundObjects, plattform, comando) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.sprays = sprays;
        this.backgroundObjects = backgroundObjects;
        this.plattform = plattform;
        this.comando = comando;
    }
}