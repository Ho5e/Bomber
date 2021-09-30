var SpriteManager = function() {

    var sprites = [];
    var me = this;

    // add a sprite to the manager
    this.Add = function(_name, _category, _sprite) {
        _sprite.SpriteManager = me;
        _sprite.SpriteManagerName = _name;

        sprites.push({
            Name: _name,
            Category: _category,
            Sprite: _sprite
        })            
    }

    // get a sprite of a given name
    this.GetByName = function(_name) {
        return $.grep(sprites, function(o, i) { return o.Name == _name; });
    }

    // get all sprites of a given category
    this.GetByCategory = function(_category) {
        return $.grep(sprites, function(o, i) { return o.Category == _category; });
    }

    // clear out all sprites
    this.Clear = function() {
        for (var i = 0; i < sprites.length; i++) {
            sprites[i].Sprite.Destroy();
        }
        sprites = [];
    }

    // clear out a specific sprite
    this.DestroyByName = function(_name) {
        for (var i = 0; i < sprites.length; i++) {
            if (sprites[i].Name == _name) {
                sprites[i].Sprite.Destroy();
            }
        }
        sprites = $.grep(sprites, function(o, i) { return o.Name != _name; });
    }

    // get rid of all sprites of a category
    this.DestroyByCategory = function(_category) {
        for (var i = 0; i < sprites.length; i++) {
            if (sprites[i].Category == _category) {
                sprites[i].Sprite.Destroy();
            }
        }
        sprites = $.grep(sprites, function(o, i) { return o.Category != _category; });
    }

    // get a count of all sprites in the system
    this.Count = function() {
        return sprites.length;
    }

    // get a count of all sprites of a category
    this.CountByCategory = function(_category) {
        return $.grep(sprites, function(o, i) { return o.Category == _category; }).length;
    }

    // will check if a given sprite is colliding with any other sprite, and return an array of any colliding sprites
    this.CheckForCollision = function(_name, tolerance) {
        var results = [];

        var source = this.GetByName(_name);
        if (!source) {
            return results;
        }

        if (tolerance === undefined) {
            tolerance = 0;
        }

        var sl = source[0].Sprite.X + tolerance;
        var sr = source[0].Sprite.X + source[0].Sprite.Width - tolerance;
        var st = source[0].Sprite.Y + tolerance;
        var sb = source[0].Sprite.Y + source[0].Sprite.Height - tolerance;

        // loop sprites
        for (var i = 0; i < sprites.length; i++) {
            var target = sprites[i];

            // ignore the source sprite which will be in the sprites array somewhere
            if (target.Name == _name) {
                continue; 
            }

            var tl = target.Sprite.X;
            var tr = target.Sprite.X + target.Sprite.Width;
            var tt = target.Sprite.Y;
            var tb = target.Sprite.Y + target.Sprite.Height;
    
            // now calculate if any collisions between the source and target, if so add target to the results array
            var xoverlap = (sl >= tl && sl <= tr) || (sr >= tl && sr <= tr);
            var yoverlap = (st >= tt && st <= tb) || (sb >= tt && sb <= tb);

            if (xoverlap && yoverlap) {
                results.push(target);
            }
        }

        return results;
    }
}
