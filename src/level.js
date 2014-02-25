define(["init", "components", "actions", "config"],
    function(init, components, actions, config) {

    var WINDOW_PADDING = 10;
    var GAMEBOY_VIEWPORT_HEIGHT = 95;
    var GAMEBOY_VIEWPORT_WIDTH = 109;
    var GAMEBOY_VIEWPORT_GREY = 85;
    var MAXIMUM_SCALE = 3.0;

    function get_scale(w, h) {
        var scale;
        if ($(window).height() < $(window).width()) {
            scale = $(window).height() / h;
        } else {
            scale = $(window).width() / w;
        }

        return Math.min(scale, MAXIMUM_SCALE);
    }

    function px(val) {
        return val + 'px';
    }

    function setup_stage() {
        // God save whoever wants to touch this scaling code
        bg_width = config.width;
        bg_height = config.height;
        var top_offset = $('#top-bar').outerHeight(true);
        var scale = get_scale(bg_width,
                              bg_height+top_offset+WINDOW_PADDING-
                              //bg_height+GAMEBOY_VIEWPORT_HEIGHT+WINDOW_PADDING);
                              (GAMEBOY_VIEWPORT_HEIGHT-GAMEBOY_VIEWPORT_GREY));
        var width = (bg_width - WINDOW_PADDING) * scale;
        var height = (bg_height - WINDOW_PADDING) * scale;

        Crafty.viewport.reset();
        Crafty.viewport.scale(scale);

        Crafty.stage.elem.style.overflow = "visible";
        Crafty.stage.elem.style.position = "absolute";

        var x = ($(window).width() / 2) - (width / 2);
        var y = (GAMEBOY_VIEWPORT_HEIGHT * scale) + top_offset;

        Crafty.stage.elem.style.left = px(x);
        Crafty.stage.elem.style.top = px(y);
        Crafty.stage.elem.style.width = px(bg_width * scale);
        Crafty.stage.elem.style.height = px(bg_height * scale);

        // Now calculate the new GB locations
        $('#bg-img').css('-webkit-transform', 'scale(' + scale + ')');
        $('#bg-img').css('-webkit-transform-origin', 'top left');
        $('#bg-img').css('-moz-transform', 'scale(' + scale + ')');
        $('#bg-img').css('-moz-transform-origin', 'top left');
        $('#bg-img').css('-ms-transform', 'scale(' + scale + ')');
        $('#bg-img').css('-ms-transform-origin', 'top left');
        $('#bg-img').css('top', px(top_offset));
        $('#bg-img').css('left', px(x - (GAMEBOY_VIEWPORT_WIDTH*scale)));
        $('#bg-img').css('display', 'inline');

        var scrollY = y - 50;
        $(document).scrollTop(scrollY);
        $("document,html,body").scrollTop(scrollY);
    }

return {
    create: function(name, background, fn) {
        var o = new Option(name, name);
        $('#scene-select').append(o);

        Crafty.scene(name, function() {
            setup_stage();

            $(window).resize( function() {
                setup_stage();
            });

            config.currentLevelName = name;
            config.currentLevel =
                Crafty.e('Script, Scenery, Delay, Image')
                      .image("resources/backgrounds/" + background + ".png")
                      .attr({w: config.width, h: config.height, z:1})

            Crafty.audio.play(background, -1, 0.3);

            config.currentLevel.status =
                Crafty.e("Status, Tween").Status(1, 2).text(name).attr({visible: false});

            $('#scene-select').val(name);

            fn(config.currentLevel);

            Crafty.trigger("levelSize", {
                w: config.currentLevel.w,
                h: config.currentLevel.h,
            });

            $("#cr-stage").focus();
            Crafty.trigger('step');
        });
    }
}

});
