/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var SVG;
    (function (SVG) {
        'use strict';
        var PathBuilder = /** @class */ (function () {
            function PathBuilder() {
                this.paths = [];
            }
            PathBuilder.prototype.addCommand = function (command) {
                this.paths.push(command);
            };
            PathBuilder.prototype.addCommandString = function (command) {
                this.paths.push(command);
            };
            PathBuilder.prototype.toString = function () {
                var path = [];
                this.paths.forEach(function (p) {
                    path.push(p.toString(), ' ');
                });
                return path.join('');
            };
            return PathBuilder;
        }());
        SVG.PathBuilder = PathBuilder;
    })(SVG = InspiralWeb.SVG || (InspiralWeb.SVG = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=PathBuilder.js.map