require.config({
    baseUrl: "src",
    urlArgs: "bust=" +  (new Date()).getTime(),
});

$(document).ready(function() {
    require(['init'], function() {
        Crafty.scene("loading", function() {
            Crafty.background("#000000");
            var loadingText = Crafty.e("2D, DOM, Text")
                .attr({w: 200, h: 20,
                       x: (((Crafty.viewport.width) / 2) - 100),
                       y: ((Crafty.viewport.height / 2) - 20),
                       z: 2})
                .text('Loading...')
                .textColor('#FFFFFF')
                .textFont({'size' : '24px', 'family': 'Arial'});

            require(['resources'], function(resources) {
                Crafty.load(resources.get(), function() {
                    require(['scenes/load'], function() {
                        $('#top-bar-content').show();
                        loadingText.destroy();
                        Crafty.scene("Intro");
                    });
                }, function(e) {
                    loadingText.text("Loading... (" + Math.round(e.percent) + "%)");
                }, function(e) {
                    loadingText.text("Error loading: " + e.src);
                    console.log("Error loading: " + e.src);
                });

            });
        });

        Crafty.scene("loading");
    });
});
