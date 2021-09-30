// difficulty settings
var MAX_BOMBS = 2;
var MAX_CITY_HEIGHT_DIVIDER = 2;
var PLANE_SPEED = 75;

// set up the map
var map = new Map(15, 15);
map.Checkbox = false;
map.BaseColour = "#ccf";
map.Render();

// set up score
var score = 0;
var scoreTimer = setInterval(function() { 
    $("#ScoreLegend").text("Score: " + Math.floor(score));
 }, 100);
 $("#Controls").css("width", "calc(" + (map.width * map.CellSize) + "vmin - 10px)");

// set up the sprite manager
var spriteManager = new SpriteManager();

// build a city
var cityBuilder = new CityBuilder();
cityBuilder.Build(map, spriteManager);

// set up biplane
var biplane = new Sprite("plane");
biplane.Width = map.CellSize;
biplane.Height = map.CellSize;
biplane.X = map.Right - map.CellSize;
biplane.Render();

biplane.Transition = function() {
    biplane.X -= (map.CellSize / 4);
    if (biplane.X <= 0 - map.CellSize) {
        if (Math.ceil(biplane.Y) >= Math.ceil(map.Bottom - map.CellSize)) {
            biplane.SetTransition(false, 0);
            alert("GAME OVER, YOU LANDED SAFELY!");
            return;
        }
        biplane.X = map.Right - map.CellSize;
        biplane.Y += map.CellSize;
    }
    score += 0.25;
    biplane.Render();

    var collisions = $.grep(spriteManager.CheckForCollision("plane", 5), function(o, i) { return o.Category == "block"; });
    if (collisions.length > 0) {
        biplane.SetTransition(false, 0);
        spriteManager.DestroyByName("plane");
        spriteManager.DestroyByCategory("bomb");
        alert("KABOOM! BAD LUCK, TRY AGAIN NEXT TIME!");    
    }
}

biplane.SetTransition(true, PLANE_SPEED);

spriteManager.Add("plane", "plane", biplane);

// wire in controls
var bombCount = 0;
$("#FireBomb").click(function() {
    var activeBombCount = spriteManager.CountByCategory("bomb");
    if (activeBombCount >= MAX_BOMBS) {
        // enforce max bombs on screen at any one time
        return;
    }

    var bomb = new Sprite("bomb");
    var bombName = "bomb_" + (++bombCount);
    bomb.Width = map.CellSize / 2;
    bomb.Height = map.CellSize * 0.9;
    bomb.X = biplane.X;
    bomb.Y = biplane.Y + map.CellSize;
    bomb.Render();

    bomb.Transition = function() {
        if (Math.ceil(bomb.Y) >= Math.ceil(map.Bottom - map.CellSize)) {
            bomb.SetTransition(false, 0);
            spriteManager.DestroyByName(bombName);
            return;
        }
        bomb.Y += (map.CellSize / 3);
        bomb.Render();

        // find any collisions with buildings and the bomb
        var collisions = $.grep(spriteManager.CheckForCollision(bombName, 2), function(o, i) { return o.Category == "block"; });
        if (collisions.length > 0) {
            for (var i = 0; i < collisions.length; i++) {
                bomb.SetTransition(false, 0);
                spriteManager.DestroyByName(bombName);
                score += 50;    
                spriteManager.DestroyByName(collisions[i].Name);
            }
        }
    };
   
    bomb.SetTransition(true, 50);

    spriteManager.Add(bombName, "bomb", bomb);
});