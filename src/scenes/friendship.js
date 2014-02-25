define(["level", "actions", "entities"],
    function(level, actions, entities) {

level.create("The Friendship", "ctbackground", function(level) {
    e = entities.load();
    a = actions;

    Crafty.background('lightblue');
    level.ground({y: 210})
         .script([
            a.score(e.marioScore, 26),
            a.score(e.marioCoins, 30),
            a.place(e.mario, 75),
            a.flipRight(e.mario),
            a.place(e.princess, 145, 205),
            a.place(e.clouds, 0, 255),
            a.showLevel(),
            a.say(e.princess, ["Let's go build a snowman!",
                               "Let's go to a museum!",
                               "Let's go to a restaurant!",
                               "Let's go bike riding!",
                               "Let's go explore SoNo!"]),
            a.say(e.mario, ["Can I take a nap?"]),
            a.say(e.princess, ["No, aren't you EXCITED?!"]),
            a.say(e.mario, ["Yes. Can I take a nap after?"]),
            a.say(e.princess, ["Fine."]),
            a.showTextFade("Time passes", 2000),
            a.score(e.marioScore, 27),
            a.score(e.marioCoins, 50),
            a.say(e.princess, ["You're my brother from another mother."]),
            a.say(e.mario, ["You're my sister from another mister."]),
            a.say(e.princess, ["Do you think we'll grow apart?"]),
            a.say(e.mario, ["Let's not get too sappy, people are watching."]),
            a.showTextFade("More time passes", 2000),
            a.score(e.marioCoins, 60),
            a.say(e.princess, ["I think it's time for me to go back to California."]),
            a.say(e.mario, ["Don't worry, we'll remain best friends."]),
            a.say(e.princess, ["People always say that. We'll forget about each other."]),
            a.say(e.mario, ["We'll just have to try our best."]),
            a.changeScene("The Departing"),
        ]);
});

});
