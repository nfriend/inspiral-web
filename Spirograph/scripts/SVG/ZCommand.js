/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (SVG) {
        var ZCommand = (function () {
            function ZCommand() {
            }
            ZCommand.prototype.toString = function () {
                return "Z";
            };
            return ZCommand;
        })();
        SVG.ZCommand = ZCommand;
    })(Spirograph.SVG || (Spirograph.SVG = {}));
    var SVG = Spirograph.SVG;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=ZCommand.js.map
