/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var SVG;
    (function (SVG) {
        'use strict';
        var ACommand = /** @class */ (function () {
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
        }());
        SVG.ACommand = ACommand;
    })(SVG = InspiralWeb.SVG || (InspiralWeb.SVG = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=ACommand.js.map