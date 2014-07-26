/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (SVG) {
        'use strict';

        var MCommand = (function () {
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
        })();
        SVG.MCommand = MCommand;
    })(Spirograph.SVG || (Spirograph.SVG = {}));
    var SVG = Spirograph.SVG;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=MCommand.js.map
