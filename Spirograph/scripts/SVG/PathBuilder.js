/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (SVG) {
        var PathBuilder = (function () {
            function PathBuilder() {
                this.paths = [];
            }
            PathBuilder.prototype.add = function (command) {
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
        })();
        SVG.PathBuilder = PathBuilder;
    })(Spirograph.SVG || (Spirograph.SVG = {}));
    var SVG = Spirograph.SVG;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=PathBuilder.js.map
