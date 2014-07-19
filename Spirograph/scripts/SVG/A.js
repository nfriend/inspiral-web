/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (SVG) {
        var ACommand = (function () {
            function ACommand() {
            }
            ACommand.prototype.toString = function () {
                var parameters = [];
                parameters.push("A");

                return parameters.join('');
            };
            return ACommand;
        })();
        SVG.ACommand = ACommand;
    })(Spirograph.SVG || (Spirograph.SVG = {}));
    var SVG = Spirograph.SVG;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=A.js.map
