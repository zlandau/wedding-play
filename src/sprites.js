define(['init'], function() {

Crafty.sprite(24, 32, "resources/coin.png", {
    Coin: [0, 0]
});

/*Crafty.sprite("resources/invitation.png", {
    Invitation: [0, 0]
});*/

Crafty.sprite(22, 32, "resources/princess.png", {
    Princess: [0, 0]
});

Crafty.sprite(17, 28, "resources/marioandluigi.png", {
    Mario: [0, 2]
});

Crafty.sprite(17, 25, "resources/babymario.png", {
    BabyMario: [0, 2]
});

Crafty.sprite(26, 31, "resources/wizard.png", {
    Wizard: [0, 0]
});

Crafty.sprite(16, 16, "resources/tinyfriend.png", {
    TinyFriend: [0, 0]
});

Crafty.sprite(18, 24, "resources/babyprincess.png", {
    BabyPrincess: [0, 0]
});

// XXX: ehh not really 31 but I am getting visual artifacts..
Crafty.sprite(18, 31, "resources/luigi.png", {
    Luigi: [0, 0],
    BabyLuigi: [1, 0]
});

Crafty.sprite(8, 8, "resources/birds.png", {
    Bird: [0, 0],
});

Crafty.sprite(8, 16, "resources/fire.png", {
    Fire: [0, 0],
});

Crafty.sprite(118, 62, "resources/princessplane.png", {
    PrincessPlane: [0, 0],
});

Crafty.sprite(118, 62, "resources/marioplane.png", {
    MarioPlane: [0, 0],
});

Crafty.sprite(257, 68, "resources/clouds.png", {
    Clouds: [0, 0]
});

Crafty.sprite(32, 32, "resources/fireworks.png", {
    YellowFireworks: [0, 0],
    GreenFireworks: [1, 0],
    RedFireworks: [2, 0],
});

Crafty.sprite(16, 27, "resources/koopa.png", {
    Koopa: [0, 0],
});

Crafty.sprite(32, 32, "resources/mole.png", {
    Mole: [0, 0],
});

Crafty.sprite(29, 23, "resources/windup.png", {
    Windup: [0, 0],
});

Crafty.sprite(16, 17, "resources/computer.png", {
    Computer: [0, 0],
});

return {
    get_resources: function() {
        return ["resources/princess.png",
                "resources/marioandluigi.png",
                "resources/babymario.png",
                "resources/wizard.png",
                "resources/tinyfriend.png",
                "resources/coin.png",
                "resources/babyprincess.png",
                "resources/luigi.png",
                "resources/birds.png",
                "resources/fire.png",
                "resources/princessplane.png",
                "resources/marioplane.png",
                "resources/koopa.png",
                "resources/mole.png",
                "resources/windup.png",
                "resources/clouds.png",
                "resources/fireworks.png",
                "resources/computer.png",
                "resources/dialog.png"];
    }
}

});
