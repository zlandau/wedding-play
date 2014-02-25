define(["level", "actions", "entities"],
    function(level, actions, entities) {

level.create("The Flyaway", "greatwall", function(level) {
    e = entities.load();
    a = actions;

    Crafty.background('#778899');
    level.ground({y: 146})
         .attr({z:6})
         .script([
            a.score(e.marioScore, 6),
            a.place(e.princessPlane, 230, 110),
            a.showLevel(),
            a.play("plane", -1),
            a.move(e.princessPlane, 130),
            a.say(e.princessPlane, ["I'm off to explore new worlds!"]),
            a.move(e.princessPlane, -100),
            a.changeScene("The Baby Groom"),
        ]);
});

});
