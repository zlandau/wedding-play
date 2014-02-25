define(["init", "components", "sprites"], function() {

    return {
        load: function() {
            return {
                mario: Crafty.e("Actor, Mario")
                            .Actor("Zack", {speed: 3})
                            .animate("walk", 0, 0, 3)
                            .animate("stand", 2, 0, 2) // changed from 1...
                            .animate("stance", 13, 0, 13)
                            .animate("forward", 14, 0, 14)
                            .animate("jump", 8, 0, 8)
                            .animate("stand", -1, -1),
                babyMario: Crafty.e("Actor, BabyMario")
                            .Actor("Zacky", {speed: 3})
                            .animate("walk", 0, 0, 1)
                            .animate("run", 0, 1, 1)
                            .animate("stand", 1, 0, 1)
                            .animate("stance", 12, 0, 12)
                            .animate("jump", 8, 0, 8)
                            .animate("stand", -1, -1),
                marioPlane: Crafty.e("Actor, MarioPlane")
                            .Actor("Zack", {speed: 0.8})
                            .animate("walk", 0, 0, 1)
                            .animate("stand", 0, 0, 1)
                            .animate("walk", -1, -1),
                luigi: Crafty.e("Actor", "Luigi")
                            .Actor("Ryan", {speed: 3})
                            .animate("walk", 0, 0, 1)
                            .animate("run", 2, 0, 4)
                            .animate("stand", 6, 0, 6)
                            .animate("stance", 5, 0, 5)
                            .animate("stand", -1, -1),
                babyLuigi: Crafty.e("Actor", "BabyLuigi")
                            .Actor("Ryan", {speed: 3})
                            .animate("walk", 2, 1, 3)
                            .animate("run", 0, 1, 2)
                            .animate("stand", 3, 1, 3)
                            .animate("stance", 4, 1, 4)
                            .animate("stand", -1, -1),
                wizard: Crafty.e("Actor, Wizard")
                            .Actor("Grandpa Jack", {speed: 1})
                            .animate("walk", 0, 0, 1)
                            .animate("stand", 0, 0, 0)
                            .animate("cast", [
                                [4, 0], [3, 0], [2, 0],
                                [2, 0], [3, 0], [4, 0],
                                [0, 0]
                             ])
                            .animate("stand", -1, -1),
                tinyFriend: Crafty.e("Actor, TinyFriend")
                            .Actor("Cory", {speed: 0.5})
                            .animate("stand", 1, 0, 1)
                            .animate("walk", 0, 0, 1)
                            .animate("fall", 1, 0, 2)
                            .animate("stand", -1, -1),
                mole: Crafty.e("Actor, Mole")
                            .Actor("Mike", {speed: 1})
                            .animate("stand", 0, 0, 0)
                            .animate("walk", 0, 0, 1)
                            .animate("stand", -1, -1),
                windup: Crafty.e("Actor, Windup")
                            .Actor("Maulik", {speed: 3})
                            .animate("stand", 0, 0, 0)
                            .animate("walk", 0, 0, 1)
                            .animate("stand", -1, -1),
                koopa: Crafty.e("Actor, Koopa")
                            .Actor("Piyush", {speed: 1})
                            .animate("stand", 0, 0, 0)
                            .animate("walk", 0, 0, 1)
                            .animate("stance", 0, 3, 1)
                            .animate("stand", -1, -1),
                princess: Crafty.e("Actor, Princess")
                            .Actor("Winifred", {speed: 2})
                            .animate("stand", [
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],

                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0],
                                [3, 0]
                            ])
                    .animate("walk", 0, 0, 3)
                    .animate("stand", -1, -1),
                babyPrincess: Crafty.e("Actor, BabyPrincess")
                    .Actor("Baby Winifred", {speed: 2})
                    .animate("stand", 1, 0, 0)
                    .animate("cry", 0, 0, 1)
		    .animate("jump", 1, 0, 0)
                    .animate("stand", -1, -1),
                princessPlane: Crafty.e("Actor, PrincessPlane")
                            .Actor("Winifred", {speed: 0.6})
                            .animate("walk", 0, 0, 1)
                            .animate("stand", 0, 0, 1)
                            .animate("walk", -1, -1),
                bird: Crafty.e("Actor, Bird")
                    .animate("stand", [
                        [0, 0], [1, 0], [2, 0], [0, 0], [1, 0], [2, 0],
                        [0, 0], [1, 0], [2, 0], [0, 0], [1, 0], [2, 0],
                        [3, 0], [3, 0], [3, 0], [3, 0], [3, 0], [3, 0]

                    ])
                    .animate("stand", 240, -1),
                fire: Crafty.e("Actor, Fire")
                    .attr({z: 4})
                    .animate("stand", 0, 0, 1)
                    .animate("stand", 30, -1),
                marioScore: Crafty.e("Score").Score("MARIO", 0),
                /*marioLife: Crafty.e("Score")
                                 .Score("LIFE", 3).count(100)
                                 .bind("increment", function(amt) {
                                    if (config.sound) {
                                        Crafty.audio.play("life");
                                    }
                                 }),*/
                marioCoins: Crafty.e("Coins"),
                clouds: Crafty.e("Actor, Clouds").attr({z: 10}),
                dialog: Crafty.e('Dialog').Dialog(),
                computer: Crafty.e("Actor, Computer")
                                .Actor("Computer", {speed:0.8})
                                .animate("walk", 0, 0, 0)
                                .animate("stand", 0, 0, 0)
                                .animate("walk", -1, -1),
            }
        },
    }

});
