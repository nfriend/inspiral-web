/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (SVG) {
        var ACommand = (function () {
            function ACommand(radiusX, radiusY, xAxisRotation, largeArc, sweep, x, y) {
                this.radiusX = radiusX;
                this.radiusY = radiusY;
                this.xAxisRotation = xAxisRotation;
                this.largeArc = largeArc;
                this.sweep = sweep;
                this.x = x;
                this.y = y;
            }
            ACommand.prototype.toString = function () {
                var parameters = [];
                parameters.push("A", this.radiusX, ' ', this.radiusY, ' ', this.xAxisRotation ? this.xAxisRotation : 0, ' ', this.largeArc ? 1 : 0, ' ', this.sweep ? 1 : 0, ' ', this.x, ' ', this.y);
                return parameters.join('');
            };
            return ACommand;
        })();
        SVG.ACommand = ACommand;
    })(Spirograph.SVG || (Spirograph.SVG = {}));
    var SVG = Spirograph.SVG;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=ACommand.js.map
