var Sprite = function(fileName) {

    var me = this;
    var thisSprite = $("<img style='position: absolute; z-index: 100'></img>");
    var transitionInterval;
    var destroyed = false;

    this.FileName = fileName;
    this.X = 0;
    this.Y = 0;
    this.Width = 0;
    this.Height = 0;
    this.SpriteManager = null;
    this.SpriteManagerName = null;

    this.Transition = function() {};
    
    this.Render = function() {
        thisSprite.prop("src", "images/" + this.FileName + ".png");
        thisSprite.appendTo("#Game");
        thisSprite.css("left", "" + this.X + "vmin");
        thisSprite.css("top", "" + this.Y + "vmin");
        thisSprite.css("width", "" + this.Width + "vmin");
        thisSprite.css("height", "" + this.Height + "vmin");
    };


    this.SetTransition = function(onOff, interval) {
        if (onOff) {
            transitionInterval = setInterval(function() { me.Transition(); }, interval);
        }
        else {
            clearInterval(transitionInterval);
        }
    }

    this.Destroy = function() {
        if (destroyed) {
            // already destroyed
            return;
        }

        // remove transitions, un-render
        this.SetTransition(false, 0);
        thisSprite.remove();

        // mark as destroyed now
        destroyed = true;

        // remove from the sprite manager, if exists
        if (this.SpriteManager != null) {
            this.SpriteManager.DestroyByName(this.SpriteManagerName);
        }
    }
}
