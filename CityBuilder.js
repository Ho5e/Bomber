var CityBuilder = function() {

    this.Build = function(map, spriteManager) {

        var max = Math.floor(map.height / MAX_CITY_HEIGHT_DIVIDER);
        var blocks = [];

        // prepare the city scape
        for (var j = 0; j < map.width; j++) {
            blocks.push(Math.floor(Math.random() * max) + 1);
        }

        // now go through the blocks one at a time and create sprites for them and register them
        for (var j = 0; j < map.width; j++) {
            for (var k = 0; k < blocks[j]; k++) {

                var block = new Sprite("building");
                block.Width = map.CellSize;
                block.Height = map.CellSize;
                block.X = (j * map.CellSize);
                block.Y = ((map.height - (k + 1)) * map.CellSize);
                block.Render();

                spriteManager.Add("block_" + j + "_" + k, "block", block);
            }
        }

    };
}
