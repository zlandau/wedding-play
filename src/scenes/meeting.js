define(["level", "actions", "entities", "config"],
    function(level, actions, entities, config) {

level.create("The Meeting", "night", function(level) {
    e = entities.load();
    a = actions;

    Crafty.background('#778899');
    level.ground({y: 198})
         .script([
            a.score(e.marioScore, 26),
            a.score(e.marioCoins, 20),
            a.place(e.windup, 30),
            a.flipRight(e.windup),
            a.place(e.mario, 70),
            a.place(e.mole, 95),
            a.showLevel(),
            a.say(e.mario, ["When are we heading to Stamford downtown?"]),
            a.say(e.mole, ["We're waiting for " + e.koopa.name + "."]),
            a.say(e.windup, ["C'MON GUYS LET'S GO I CAN'T WAIT!"]),
            a.say(e.mole, ["Chill out, here he comes."]),
            a.flipRight(e.mole),
            a.flipRight(e.mario),
            a.place(e.koopa, config.width + e.koopa.w),
            a.place(e.princess, config.width + e.koopa.w + 30),
            a.follow(e.princess, e.koopa),
            a.move(e.koopa, 160),
            a.say(e.koopa, ["Hey guys, I invited one of our new coworkers.",
                            "She's a GIRL!"]),
            a.say(e.mole, ["...?"]),
            a.say(e.mario, ["A what-now?"]),
            a.say(e.windup, ["OH BOY OH BOY OH BOY"]),
            a.say(e.princess, ["Hi guys!"]),
            a.say(e.windup, ["AAAAAAAHHHHH!!!!!"]),
            a.move(e.windup, 0-e.windup.w),
            a.destroy(e.windup),
            a.wait(1000),
            a.say(e.koopa, ["Uh. Right then. Shall we?"]),
            a.flipRight(e.princess),
            a.follow(e.mole, e.koopa),
            a.follow(e.mario, e.koopa),
            a.move(e.koopa, 250),
            a.changeScene("The Friendship"),
        ]);
});

});
