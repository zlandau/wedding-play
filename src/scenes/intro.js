define(["level", "actions", "entities"],
    function(level, actions, entities) {

level.create("Intro", "curtains", function(level) {
    e = entities.load();
    a = actions;

    level.ground({y: 210})
         .script([
            a.place(e.mario, 80),
            a.score(e.marioScore, 29),
            a.score(e.marioCoins, 5),
            a.animate(e.mario, "forward", -1),
            a.place(e.princess, 120),
            a.showLevel(),
            a.showTextFade("Click or hit the spacebar to advance dialog", 2000),
            a.say(e.mario, ["Ladies and gentlemen, boys and girls,",
                            "cops and robbers, cowboys and indians.",
                            "Welcome to our little play."]),
            a.say(e.princess, ["It's nice to see you here today.",
                               "We'd like to take this opportunity to tell you our story.",
                               "Who we are, how we met, how we ended up getting stuck in a Gameboy."]),
            a.say(e.mario, ["There's a quiz at the end, so turn off your phones, grab your popcorn,",
                            "and prepare for some 8-bit fun."]),
            a.changeScene("The Baby Bride"),
        ]);
});

});
