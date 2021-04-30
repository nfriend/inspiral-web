/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
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
    })(InspiralWeb.SVG || (InspiralWeb.SVG = {}));
    var SVG = InspiralWeb.SVG;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=A.js.map
