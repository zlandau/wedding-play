define(["init", "entities", "config"], function(_, entities, config) {

    e = entities.load();

return {

    move: function(entity, where, vertical) {
        return function() {

            var axis
            if (vertical)
                axis = entity.y;
            else
                axis = entity.x;

            if (axis > where)
                entity.unflip();
            else
                entity.flip();
            entity.animate("walk", 19, -1);
            for (var i = 0; i < entity._children.length; i++) {
                entity._children[i].animate("walk", 19, -1);
            }

            entity.bind("TweenEnd", function(k) {
                this.unbind("TweenEnd");
                entity.animate("stand", -1, -1);
                for (var i = 0; i < entity._children.length; i++) {
                    entity._children[i].animate("stand", -1, -1);
                }

                Crafty.trigger("step");
            });
            var speed = Math.round(Math.abs(axis - where) / entity.speed);
            if (vertical)
                entity.tween({y:where}, speed);
            else
                entity.tween({x:where}, speed);

        }
    },
    jump: function(entity) {
        return function() {
            var origY = entity.y;
            Crafty.audio.play("jump");
            entity.animate("jump", 1, -1);
            entity.tween({y: entity.y-30}, 9);
            entity.bind("TweenEnd", function(k) {
                entity.unbind("TweenEnd");
                entity.tween({y: origY}, 9);
                entity.bind("TweenEnd", function(k) {
                    entity.unbind("TweenEnd");
                    entity.animate("stand", 60, -1);
                    Crafty.trigger("step");
                });
            });
        }
    },
    say: function(entity, newDialog) {
        return function() {
            e.dialog.
              updateScale(config.currentLevel).
              startDialog(entity, newDialog);
        }
    },
    wait: function(ms) {
        return function() {
            config.currentLevel.delay(function() {
                Crafty.trigger("step");
            }, ms)
        }
    },
    sprite: function(entity, reel) {
        return function() {
            entity.animate(reel, 1, 1);
        }
    },
    animate: function(entity, reel, frames, loop) {
        return function() {
            entity.animate(reel, frames, loop);
            Crafty.trigger("step");
        }
    },
    place: function(entity, wherex, wherey) {
        return function() {
            entity.attr({x: wherex,
                         y: (wherey || config.currentLevel.ground().y) - entity.h,
                         visible: true});
            Crafty.trigger("step");
        }
    },
    flipRight: function(entity) {
        return function() {
            entity.flip();
            Crafty.trigger("step");
        }
    },
    flipLeft: function(entity) {
        return function() {
            entity.unflip();
            Crafty.trigger("step");
        }
    },
    image: function(name, w, h) {
        return function() {
            /*Crafty.e("2D, Fader, Scaler, Sprite, " + name)
            .attr({
                //h: h, w: w,
                x: (Crafty.viewport.width / 2) - (this.w/2),
                y: (Crafty.viewport.height / 2) - (this.h/2),
                z: 11,
            })*/
            Crafty.e("ImageFader")
            .ImageFader(name)
            .fade('keypress');
        }
    },
    showLevel: function() {
        return function() {
            stat = config.currentLevel.status;
            var yPos = stat.y + 5;
            stat.attr({y: config.height / 2, alpha: 0.0, visible: true});
            stat.bind("TweenEnd", function(k) {
                this.unbind("TweenEnd");
                stat.timeout(function() {
                    this.tween({y: yPos}, 50);
                    this.bind("TweenEnd", function(k) {
                        this.unbind("TweenEnd");
                        Crafty.trigger("step");
                    });
                }, 1000);
            });
            stat.tween({alpha: 1.0}, 50);
        }
    },
    showTextFade: function(text, delay) {
        // XXX: can we fix the text flashing?
        return function() {
            Crafty.e("TextFader").
                TextFader().
                text(text).
                updateScale(config.currentLevel).
                fade('delay', delay);

        }
    },
    changeScene: function(next) {
        return function() {
            config.currentLevel.delay(function() {
                Crafty.trigger('ChangeScene', next);
            }, 500);
        }
    },
    follow: function(follower, followee) {
        return function() {
            followee.attach(follower);
            Crafty.trigger("step");
        }
    },
    unfollow: function(follower, followee) {
        return function() {
            followee.detach(follower)
            Crafty.trigger("step");
        }
    },
    custom: function(fn) {
        return function() {
            fn();
            Crafty.trigger("step");
        }
    },
    create: function(entity, delay) {
        return function() {
            if (delay) {
                config.currentLevel.delay(function() {
                    Crafty.e(entity);
                }, delay);
            } else {
                Crafty.e(entity);
            }
            Crafty.trigger("step");
        }
    },
    destroy: function(entity) {
        return function() {
            entity.destroy();
            Crafty.trigger("step");
        }
    },
    play: function(sound, repeat, volume) {
        return function() {
            Crafty.audio.play(sound, repeat, volume);
            Crafty.trigger("step");
        }
    },
    stop: function(sound) {
        return function() {
            Crafty.audio.stop(sound);
            Crafty.trigger("step");
        }
    },
    score: function(entity, score) {
        return function() {
            entity.count(score);
            Crafty.trigger("step");
        }
    },
    increment: function(entity, val) {
        return function() {
            entity.increment(val);
            Crafty.trigger("step");
        }
    }

}

});

