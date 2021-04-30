/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var SVG;
    (function (SVG) {
        'use strict';
        var LCommand = /** @class */ (function () {
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
        }());
        SVG.LCommand = LCommand;
    })(SVG = InspiralWeb.SVG || (InspiralWeb.SVG = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=LCommand.js.map