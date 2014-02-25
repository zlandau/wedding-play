define(['init', 'config'], function(init, config) {

Crafty.c('Dialog', {
    init: function() {
        this.requires('2D, DOM, ScaleText, Scaler, UserInput, Delay');
    },
    Dialog: function() {
        this._dialog = null;

        this.relx = 20;
        this.rely = 40;
        this.pointerLocation = 77;
        this.box = Crafty.e('2D, DOM, Image').
                          attr({z: 9, visible: false }).
                          image("resources/dialog.png");
        this.attr({z: 10, visible: false});

        this.ScaleText(5);
        this.textColor('#0000');

        this.bind("ScaleChange", function() {
            this.resizeFont();
        });

		this.bind('UserAck', function() {
			if (this._dialog == null) {
				return;
			} else if (this._dialog.length > 0) {
				this.text(this._dialog.shift());
			} else {
                this.reset();
				Crafty.trigger("step");
			}
		});

        return this;
    },
	dialogBox: function(box) {
		this._dialogBox = box;
		return this;
    },
	startDialog: function(actor, dialog) {
		this._dialog = dialog;

        this._dialog[0] = actor.name + ": " + this._dialog[0];

        // This code got stupid messy, but essentially we're trying to figure
        // out the best place and orientation for the dialog box depending on
        // the actor's position
        var flippedY;
        var y;
        if (actor.y < (config.height / 2)) {
            y = actor.y + actor.h + this.scaleY(4);
            this.box.flip("Y");
            flippedY = true;
        } else {
            y = actor.y - this.box.h - this.scaleY(4);
            flippedY = false;
        }

        // Don't move the Y position unless it's a significant jump
        var offset = y % 20;
        if (offset < 10)
            y = y - offset;
        else
            y = y + (20 - offset);

        // We're trying to place the pointer of the dialog box near the actor's
        // head, either on the left or right depending on where on the screen
        // they are
        var x;
        if (actor.x < (config.width / 2)) {
            x = actor.x + actor.w - this.pointerLocation;
            this.box.unflip();
        } else {
            x = actor.x - this.pointerLocation;
            this.box.flip();
        }

        // Do some range changes when placing it so we don't place the dialog
        // box off the screen
        // If we end up clipping a lot from X we should decrease more from
        // Y so we aren't directly pointing at the wrong actor
        var clippedX = Math.min(Math.max(x, this.scaleX(10)),
                         config.width - this.box.w - this.scaleX(10));
        if (Math.abs(clippedX - x) > 20) {
            if (flippedY)
                y = y + this.scaleY(10);
            else
                y = y - this.scaleY(10);
        }

       var clippedY = Math.min(Math.max(y, this.scaleY(10)),
                        config.height - this.box.h - this.scaleY(10));

        this.box.attr({x: clippedX, y: clippedY, visible: true});

        this.attr({x: this.box.x + this.scaleX(5),
                   y: this.box.y + this.scaleY(5),
                   w: this.box.w - this.scaleX(5),
                   h: this.box.h - this.scaleY(5),
                   visible: true});

        // If we flipped Y then we need to move the text down to fit back in
        // the box
        if (flippedY)
            this.attr({y: this.y + this.scaleX(7)});

        this.resizeFont();
		this.text(this._dialog.shift());

		return this;
	},
    reset: function() {
        this.text("");
        this._dialog = null;
        this.attr({visible: false});
        this.box.attr({visible: false});
    }
});

Crafty.c('Scenery', {
    init: function() {
        this.requires('2D, DOM, Image, Mouse');

        this.bind('ChangeScene', function(scene) {
            config.currentLevel.reset();
            Crafty.audio.stop();
            $('#cr-stage').fadeTo(1000, 0, function() {
                Crafty.scene(scene);
                $('#cr-stage').fadeTo(1000, 1);
            });
        });
        // XXX: I think we're getting into a resize loop here. not sure what the best way to do it but the cheesiest is with a timer.. which still causes problems, dunno
        // me = this;
        // var scaling_soon = false;
        // Crafty.addEvent(this, window, "resize", function() {
        //     if (!scaling_soon) {
        //         scaling_soon = 1;
        //         me.scale();
        //     }

        //     window.setInterval(function() {
        //         scaling_soon = 0;
        //     }, 1000);
        // });
    },
    ground: function(settings) {
        if (settings) {
            this._ground = settings;
            return this;
        } else {
            return this._ground;
        }
    },
});

Crafty.c('Script', {
    init: function() {
        this._script = [];

        this.bind("step", function() {
            if (this._script.length > 0) {
                this.bind('stepDone', function() {
                    this.unbind('stepDone');
                    this._script.shift()();
                });
                this.trigger('stepDone')
            }
        });
    },
    script: function(script) {
        this._script = script;
        return this;
    },
    reset: function() {
        this._script = [];
    }
});

Crafty.c("ScaleText", {
    init: function() {
        this.requires("Text, Scaler");
    },
    ScaleText: function(size) {
        this.Scaler();
        this.textColor('#FFFFFF');
        //this.textFont({'family': 'press_start_kregular'});
        this.textFont({'family': '"Press Start 2P"'});
        this.attr({z: 10, h: 100});
        this.textsize = size;
        // XXX: will this override other bindings?
        // This overrides the binding.. for now people have to call resizeFont manually :( */
        //this.bind("ScaleChange", function() {
        //    this.textFont({'size': this.scaleX(this.textsize)  or changing the font for one changes it for all?+ 'px'});
        //});
        return this;
    },
    resizeFont: function() {
        //this.textFont({'size': Math.floor(this.scaleX(this.textsize)) + 'px'});
        this.textFont({'size': this.textsize + 'px'});
    }
});

Crafty.c("Status", {
    init: function() {
        this.requires("2D, DOM, ScaleText, Scaler");
        this.numSlots = 4;
        this.attr({visible: false});
        this.nudge = 0;
    },
    pad: function(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    },
    Status: function(slot, width) {
        this.ScaleText(8);
        width = width || 1;

        this.bind("ScaleChange", function() {
            this._slotsize = (this.range / this.numSlots) - 1;
            this.attr({x: this.scaleX(5 + (this._slotsize * slot) + this.nudge),
                       y: this.scaleY(5),
                       w: this.scaleX(this._slotsize) * width,
                       visible: true});
            this.resizeFont();
        });
        return this;
    },
});

Crafty.c("Scaler", {
    Scaler: function() {
        this.range = 100;
        this.xscale = 1;
        this.yscale = 1;
        this.bind("levelSize", function(size) {
            this.updateScale(size);
        });
    },
    scaleX: function(val) {
        return val * this.xscale;
    },
    scaleY: function(val) {
        return val * this.yscale;
    },
    updateScale: function(size) {
        this.xscale = size.w / this.range;
        this.yscale = size.h / this.range;
        Crafty.trigger("ScaleChange");
        return this;
    }
});

Crafty.c("Coins", {
    init: function() {
        this.requires("Counter");
        this.Counter(3);
        this.nudge = this.scaleX(7);
        this.attach(Crafty.e("2D, DOM, Coin")
                          .attr({x: this.x - this.scaleX(15),
                                 y: this.y - this.scaleY(5),
                                 z: 1}));

        this.bind("increment", function(amt) {
            Crafty.audio.play("coin", Math.min(amt, 2));
        });
    },
    redraw: function() {
        this.text("x" + this.pad(this.count(), 2));
    },
});

Crafty.c("Counter", {
    init: function() {
        this.requires("Status");
        this._count = 0;
    },
    Counter: function(slot) {
        this.Status(slot);
        this.redraw();
        return this;
    },
    count: function(num) {
        if (num) {
            this._count = num;
            this.redraw();
            return this;
        } else {
            return this._count;
        }
    },
    increment: function(amt) {
        this.trigger("increment", amt || 1);
        this._count += amt || 1;
        this.redraw();
    },
    decrement: function(amt) {
        this._count -= amt || 1;
        this.redraw();
    },
});

Crafty.c("Score", {
    init: function() {
        this.requires("Counter");
        this._score = 0;
    },
    Score: function(name, slot) {
        this._name = name;
        this.Counter(slot);
        return this;
    },
    redraw: function(amt) {
        // XXX: can probably be tied to some redraw manager instead?
        this.text(this._name + "\n" + this.pad(this.count(), 5));
    }
});

Crafty.c('Actor', {
    init: function() {
        this.requires("2D, DOM, Tween, SpriteAnimation");
        this.attr({z: 5, visible: false});
        return this;
    },
    Actor: function(name, attr) {
        this.name = name;
        this.speed = attr ? attr.speed : 10;
        return this;
    },
});

Crafty.c('UserInput', {
    init: function() {
        this.requires('Keyboard');
        Crafty.addEvent(this, "keydown", function(e) {
            e.key = e.keyCode || e.which;
            // Prevent scrolling on spacebar. Crafty tries to do this but it
            // first tries to detect if the stage is in focus, which doesn't
            // work reliably because the bg image is actually in the foreground
            if (e.key == Crafty.keys['SPACE']) {
                if (e.stopPropogation) e.stopPropogation()
                else e.cancelBubble = true;
                if (e.preventDefault) e.preventDefault()
                else e.returnValue = false;
                return false;
            }
        });
        this.bind("KeyUp", function(e) {
            if (e.key == Crafty.keys['SPACE']) {
                Crafty.trigger("UserAck");
            }

            if ((e.key == Crafty.keys['D']) && (config.env == "dev")) {
                Crafty.debugBar.show();
            }
        });
    }
});

Crafty.c('Fader', {
    init: function() {
        this.requires("DOM, Tween")
        this.attr({alpha: 0.0});
        this._fadeDone = null;
    },
    fade: function(trigger, param) {
        this.tween({alpha: 1.0}, 50);

        bindTo = null;
        if (trigger == 'keypress') {
            bindTo = 'UserAck';
        } else if (trigger == 'delay') {
            bindTo = 'Delay';

            this.timeout(function() {
                this.trigger('Delay');
            }, param);
        }

        this.bind(bindTo, function(e) {
            this.bind("TweenEnd", function(k) {
                Crafty.trigger('step');
                this.destroy();
            });
            this.tween({alpha: 0.0}, 50);
        });
    },
});

Crafty.c('ImageFader', {
    init: function() {
        this.requires("2D, Fader, Scaler, Image");
        this.relh = 90;
        this.rely = 90;
    },
    ImageFader: function(image) {
        this.attr({visible: true,
                  width: 2, //this.scaleX(90),
                  h: 2, //this.scaleY(90),
                  x: (Crafty.viewport.width / 2) - (this.scaleY(45/2)),
                  y: (Crafty.viewport.height / 2) - (this.scaleY(45/2)),
                  z: 11})
            .image(image);
        return this;
    },
});


Crafty.c('TextFader', {
    init: function() {
        this.requires("2D, Fader, ScaleText, Scaler");
        this.relx = 50;
        this.rely = 50;
        this.relh = 20;
        this.relw = 50;
    },
    TextFader: function(scale) {
        this.ScaleText(scale || 9);
        /* XXX: to do this right we need to account for the width of the text
         * itself.. unless there is a center option */
        this.attr({
            x: this.scaleX(this.relx) - (this.scaleX(this.relw) / 2),
            y: this.scaleY(this.rely) - (this.h / 2),
            w: this.scaleX(this.relw)});

        this.bind("ScaleChange", function() {
            this.attr({x: this.scaleX(this.relx) - (this.scaleX(this.relw) / 2),
                       y: this.scaleY(this.rely) - (this.h / 2),
                       w: this.scaleX(this.relw)});
               this.resizeFont();
        });
        return this;
    }
});

Crafty.c('Fireworks', {
    init: function() {
        this.colors = ["yellow", "green", "red"];
        this.requires("Actor, RedFireworks, Delay");
        this.animate("yellow", 0, 0, 2);
        this.animate("green", 0, 1, 2);
        this.animate("red", 0, 2, 2);
        this.attr({visible: true});
        var x = Math.floor(Math.random()*215)
        var y = 50 + Math.floor(Math.random()*10)
        var color = this.colors[Math.floor(Math.random()*3)];
        this.attr({x: x, y: y, visible: false});
        this.bind("AnimationEnd", function() {
            this.destroy();
            Crafty.e("Fireworks");
        });
        var time = 10 + Math.floor(Math.random()*20);
        Crafty.audio.play("fireworks", 1);
        this.timeout(function() {
            this.attr({visible: true});
            this.animate(color, time, 1);
        }, 2000);

    },
});

return {}

});
