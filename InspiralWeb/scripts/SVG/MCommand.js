/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var SVG;
    (function (SVG) {
        'use strict';
        var MCommand = /** @class */ (function () {
            function MCommand(x, y) {
                this.x = x;
                this.y = y;
            }
            MCommand.prototype.toString = function () {
                var parameters = [];
                parameters.push('M', ' ', this.x, ' ', this.y);
                return parameters.join('');
            };
            return MCommand;
        }());
        SVG.MCommand = MCommand;
    })(SVG = InspiralWeb.SVG || (InspiralWeb.SVG = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=MCommand.js.map