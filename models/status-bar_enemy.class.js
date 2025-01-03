class StatusBarEnemy extends DrawableObjects {


    IMAGES = [
        'img/debugger/statusbar/enemy_health/e0.png',
        'img/debugger/statusbar/enemy_health/e20.png',
        'img/debugger/statusbar/enemy_health/e30.png',
        'img/debugger/statusbar/enemy_health/e40.png',
        'img/debugger/statusbar/enemy_health/e50.png',
        'img/debugger/statusbar/enemy_health/e60.png',
        'img/debugger/statusbar/enemy_health/e70.png',
        'img/debugger/statusbar/enemy_health/e80.png',
        'img/debugger/statusbar/enemy_health/e90.png',
        'img/debugger/statusbar/enemy_health/e100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = -555;
        this.y = 0;
        this.width = 150;
        this.height = 40;
        this.setPercentage(100);
    }
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImage()];
        this.img = this.imageCache[path];
    }

    resolveImage() {
        if (this.percentage == 100) {
            return 9;
        } else if (this.percentage >= 90) {
            return 8;
        } else if (this.percentage >= 80) {
            return 7;
        } else if (this.percentage >= 70) {
            return 6;
        } else if (this.percentage >= 60) {
            return 5;
        } else if (this.percentage >= 50) {
            return 4;
        } else if (this.percentage >= 40) {
            return 3;
        } else if (this.percentage >= 30) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}