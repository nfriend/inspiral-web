/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (SVG) {
        var LCommand = (function () {
            function LCommand(x, y) {
                this.x = x;
                this.y = y;
            }
            LCommand.prototype.toString = function () {
                var parameters = [];
                parameters.push('L', ' ', this.x, ' ', this.y);
                return parameters.join('');
            };
            return LCommand;
        })();
        SVG.LCommand = LCommand;
    })(Spirograph.SVG || (Spirograph.SVG = {}));
    var SVG = Spirograph.SVG;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=LCommand.js.map
