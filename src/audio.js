define(['init'], function() {

var audio = {
    coin: "coin",
    life: "smw_1-up",
    jump: "smw_jump",
    fireworks: "smw_firework",
    pause: "smw_pause",
    plane: "plane",
    clear: "smw_course_clear",
    vine: "smb_vine",
    cthome: "scenes/cthome",
    greatwall: "scenes/greatwall",
    curtains: "scenes/curtains",
    ctbackground: "scenes/ctbackground",
    cabackground2: "scenes/cabackground2",
    castle: "scenes/castle",
    night: "scenes/night",
};

function paths(v) {
    return ["resources/audio/" + v + ".ogg",
            "resources/audio/" + v + ".mp3"];
}

_.each(audio, function(v, k) {
    Crafty.audio.add(k, paths(v));
});

return {
    get_resources: function() {
        return _.flatten(_.map(audio, function(v, k) {
            return paths(v);
        }));
    }
}

});
