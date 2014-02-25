define(["level", "actions", "entities"],
    function(level, actions, entities) {

level.create("The Wedding", "castle", function(level) {
    e = entities.load();
    a = actions;

    Crafty.background('lightblue');
    level.ground({y: 210})
         .script([
            a.score(e.marioScore, 29),
            a.score(e.marioCoins, 10),
            a.place(e.mario, 85),
            a.flipRight(e.mario),
            a.place(e.princess, 110),
            a.showLevel(),
            a.say(e.princess, ["So that's the story so far,"]),
            a.say(e.mario, ["and we want you to be in the next part."]),
            a.say(e.princess, ["Please join us in celebrating our wedding on May 5th, 2013 in Connecticut."]),
            a.say(e.princess, ["You know, the Constitution State. The Nutmeg State. The Land of Steady Habits?!"]),
            a.say(e.mario, ["See the website for more details. And feel free to use our Facebook group to ask questions.", "And click on some ads, weddings aren't cheap you know."]),
            a.score(e.marioCoins, 5),
            a.say(e.princess, ["See you all there!"]),
            a.play("clear"),
            a.create("Fireworks"),
            a.create("Fireworks", 500),
            a.say(e.mario, ["Click on 'Go to main page' above to go to the webpage."]),
        ]);
});

});
