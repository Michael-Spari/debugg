const level1 = new Level(
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
    ],

    [
        new Cloud(),
    ],

    [
        new BackgroundObject('img/debugger/5_background/1_first_layer/background_1.png',0, 0),
        new BackgroundObject('img/debugger/5_background/1_first_layer/background_1.png',720, 0),
        new BackgroundObject('img/debugger/5_background/1_first_layer/background_1.png',720*2, 0),
        new BackgroundObject('img/debugger/5_background/1_first_layer/background_keller.png',720*3, 0),
    ]
);