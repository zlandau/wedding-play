define(["level", "actions", "entities"],
    function(level, actions, entities) {

level.create("The Departing", "ctbackground", function(level) {
    e = entities.load();
    a = actions;

    Crafty.background('lightblue');
    level.ground({y: 210})
         .script([
            a.score(e.marioScore, 27),
            a.score(e.marioCoins, 60),
            a.place(e.princessPlane, 230, 155),
            a.showLevel(),
            a.play("plane", -1),
            a.move(e.princessPlane, 130),
            a.say(e.princessPlane, ["See ya later, snow!"]),
            a.move(e.princessPlane, -100),
            a.destroy(e.princessPlane),
            a.stop("plane"),
            a.wait(2000),
            a.place(e.marioPlane, 230, 155),
            a.play("plane", -1),
            a.move(e.marioPlane, 150),
            a.say(e.marioPlane, ["Hey, wait for me!"]),
            a.move(e.marioPlane, -100),
            a.changeScene("The Golden State"),
        ]);
});

});
