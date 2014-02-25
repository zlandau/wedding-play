define(["level", "actions", "entities"],
    function(level, actions, entities) {

level.create("The Baby Bride", "greatwall", function(level) {
    e = entities.load();
    a = actions;

    Crafty.background('#778899');
    level.ground({y: 146})
         .attr({z:6})
         .script([
            a.score(e.marioScore, 6),
            a.place(e.babyPrincess, 100),
            a.showLevel(),
            a.say(e.babyPrincess, ["您好 外国人",
                                   "Oh sorry, hello! (foreigner)",
                                   "Why am I sitting on a Chinese landmark? " +
                                   "I don't remember this being in Shanghai.",
                                   "Anyway, I should introduce myself. My name is Winifred.",
                                   "I live in Shanghai, but I'm about to blow this popsicle stand.",
                                   "MIT is calling my name. Besides, I hear white boys are the best.",
                                   "I better grow up a bit first. I think 11 years old ought to do it."]),

            a.jump(e.babyPrincess), a.jump(e.babyPrincess),
            a.destroy(e.babyPrincess),
            a.place(e.princess, 100),
            a.say(e.princess, ["There we go, much better! Now it's time to get out of here."]),
            a.changeScene("The Flyaway"),
        ]);
});

});
