define(["level", "actions", "entities", "config"],
    function(level, actions, entities, config) {

level.create("The Baby Groom", "cthome", function(level) {
    e = entities.load();
    a = actions;

    level.ground({y: 192})
         .script([
            a.score(e.marioScore, 10),
            a.place(e.babyMario, 138),
            a.place(e.fire, 187, 190),
            a.place(e.bird, 50, 47),
            a.place(e.babyLuigi, 117),
            a.flipRight(e.babyLuigi),
            a.showLevel(),
            a.say(e.babyMario, ["It sure is a nice day here in Connecticut. Where we live."]),
            a.say(e.babyLuigi, ["Yep, it's where we live all right. You and me, your older brother."]),
            a.say(e.babyMario, ["Yeah, I know who you are. And look, here comes our younger brother."]),
            a.flipLeft(e.babyLuigi),
            a.place(e.tinyFriend, -32),
            a.move(e.tinyFriend, 98),
            a.animate(e.tinyFriend, "fall", -1),
            a.wait(500),
            a.animate(e.tinyFriend, "stand", -1),
            a.say(e.tinyFriend, ["Goo goo, gah gah"]),
            a.say(e.babyLuigi, ["Pardon?"]),
            a.say(e.tinyFriend, ["*ahem* Sorry, had something stuck in my throat. I said, What\'s up?"]),
            a.say(e.babyLuigi, ["Nothing much, just recounting the obvious."]),
            a.say(e.tinyFriend, ["I hear Grandpa is coming by with a gift for us.",
                                 "In fact, it looks like that's him now. What impeccible timing."]),
            a.place(e.wizard, -32),
            a.move(e.wizard, 75),
            a.say(e.wizard, ["Stop fighting!", "Oh, sorry, reflexes.", "Happy Channukah!"]),
            a.say(e.babyMario, ["Hi grandpa! Boy are you looking handsome today."]),
            a.flipRight(e.babyLuigi),
            a.say(e.babyLuigi, ["Stop sucking up, he already bought the present."]),
            a.flipLeft(e.babyLuigi),
            a.say(e.wizard, ["That's right. Now lets see if I can remember the birthday gift spell."]),
            a.animate(e.wizard, "cast", 120, 1),
            a.wait(1000),
            a.place(e.computer, config.width / 2, -32),
            a.play("vine"),
            a.move(e.computer, 75, true),
            a.wait(1000),
            a.say(e.tinyFriend, ["A computer? Laaaaame."]),
            a.say(e.babyLuigi, ["Not too shabby."]),
            a.say(e.babyMario, ["Welp, see you guys in a few years. Byebye, sunlight!"]),
	    a.jump(e.babyMario), a.flipRight(e.babyMario), a.jump(e.babyMario),
            a.move(e.babyMario, 290),
            a.changeScene("The Meeting"),
        ]);
});

});
