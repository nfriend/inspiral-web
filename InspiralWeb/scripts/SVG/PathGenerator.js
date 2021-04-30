/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
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
    })(InspiralWeb.SVG || (InspiralWeb.SVG = {}));
    var SVG = InspiralWeb.SVG;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=PathGenerator.js.map
