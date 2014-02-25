define(["level", "actions", "entities"],
    function(level, actions, entities) {

level.create("The Golden State", "cabackground2", function(level) {
    e = entities.load();
    a = actions;

    Crafty.background('lightblue');
    level.ground({y: 220})
         .script([
            a.score(e.marioScore, 27),
            a.score(e.marioCoins, 70),
            a.place(e.mario, 75),
            a.flipRight(e.mario),
            a.place(e.princess, 130),
            a.showLevel(),
            a.say(e.mario, ["Oranges.. growing on trees?"]),
            a.say(e.princess, ["Welcome to California."]),
            a.say(e.mario, ["Sunshine every day?"]),
            a.say(e.princess, ["Welcome to California."]),
            a.say(e.mario, ["Astronomical taxes and incompetent politicians?"]),
            a.say(e.princess, ["Uh, well, welcome to California?"]),
            a.showTextFade("Time passes", 2000),
            a.score(e.marioCoins, 75),
            a.say(e.mario, ["...what do you want to do today?"]),
            a.say(e.princess, ["...what do you want for dinner?"]),
            a.say(e.mario, ["..want to stay home and watch a movie?"]),
            a.wait(1000),
            a.score(e.marioScore, 29),
            a.say(e.princess, ["Do you think we should..."]),
            a.move(e.mario, 105),
            a.say(e.mario, ["...get married?"]),
            a.say(e.mario, ["I don't believe in the institution of marriage, and besides, that might cramp my style.",
                            "Now where are my pajamas, I'm taking a nap."]),
            a.say(e.princess, ["Do you care about me?"]),
            a.say(e.mario, ["Very much so."]),
            a.say(e.princess, ["Do you want to be my friend forever?"]),
            a.say(e.mario, ["I couldn't imagine life without you around. I've always loved you."]),
            a.say(e.princess, ["Isn't that... sort of like... marriage?"]),
            a.say(e.mario, ["Well no, because.. uh.. well you see..."]),
            a.changeScene("The Wedding"),
        ]);
});

});
