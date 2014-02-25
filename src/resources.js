define(['init', 'sprites', 'audio', 'images'],
    function(_, sprites, audio, images) {

return {
    get: function() {
        return sprites.get_resources()
              .concat(audio.get_resources())
              .concat(images.get_resources());
    }
}

});
