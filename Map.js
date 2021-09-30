var Map = function(width, height) {

    this.width = width;
    this.height = height;

    this.Checkbox = false;
    this.BaseColour = "#fff";

    this.Left = 0;
    this.Top = 0;
    this.Right = 0;
    this.Bottom = 0;
    this.CellSize = 0;

    this.Render = function() {
            var h = (1 / height) * 90;
            var w = (1 / width) * 90;
            var dimension = w < h ? w : h;

            this.Right = dimension * this.width;
            this.Bottom = dimension * this.height;
            this.CellSize = dimension;

            var check = false;
            var block = "<span style='display: inline-block; width: " + dimension + "vmin; height: " + dimension + "vmin'></span>";
            for (j = 1; j<= this.height; j++) {
                var row = $("<div></div>").appendTo("#Game");
                check = this.width % 2 !== 0 ? check : this.Checkbox && !check;
                for (k = 1; k <= this.width; k++) {
                    var cell = $(block);
                    check = this.Checkbox && !check;
                    cell.css("background-color", this.BaseColour);
                    if (check) {
                        cell.css("background-color", "#bbb");
                    }
                    cell.appendTo(row);
                }
            }
    };
}