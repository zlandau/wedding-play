define(['config'], function(config) {
    Crafty.init();
    Crafty.settings.modify("autoPause", true);
    var haveAudio = Crafty.support.audio;

    if (config.env == "dev") {
        Crafty.modules({ 'crafty-debug-bar': 'DEV' }, function () {
            // Nothing to put here, but the module seems to like it
        });
    }

    if (!config.sound) {
        Crafty.audio.mute();
        Crafty.support.audio = false;
        $('#sound-enable').attr('checked', false);
    }

    if ($.browser.msie) {
        $("#ie-placeholder").html("| IE not recommended due to its terribleness");
    }

    $('#scene-select').change(function(e) {
        Crafty.trigger('ChangeScene', e.target.value);
    });

    // The BG image is actually in the foreground with transparency, so it's
    // going to have to handle the clicks...
    $('#bg-img').click(function(e) {
        Crafty.trigger("UserAck");
    });

    $('#sound-enable').change(function(e) {
        if (e.target.checked) {
            Crafty.support.audio = haveAudio;
            Crafty.audio.unmute();
        } else {
            Crafty.audio.mute();
            Crafty.support.audio = false;
        }
    });

    if (config.env != "dev") {
        Crafty.bind("Pause", function() {
            Crafty.audio.play("pause");
        });

        Crafty.bind("Unpause", function() {
            Crafty.audio.play("pause");
        });
    }
});
