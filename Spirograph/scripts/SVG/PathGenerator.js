/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (SVG) {
        var PathBuilder = (function () {
            function PathBuilder() {
            }
            PathBuilder.prototype.add = function (command) {
                this.paths.push(command);
            };
            return PathBuilder;
        })();
        SVG.PathBuilder = PathBuilder;
    })(Spirograph.SVG || (Spirograph.SVG = {}));
    var SVG = Spirograph.SVG;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=PathGenerator.js.map
