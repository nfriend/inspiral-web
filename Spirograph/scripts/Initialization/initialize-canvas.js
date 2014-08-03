/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        function initializeCanvas() {
            var canvas = d3.select("body").append("canvas").attr({
                id: 'spirograph-canvas',
                width: Spirograph.canvasWidth,
                height: Spirograph.canvasHeight
            });

            var ctx = canvas.node().getContext('2d');
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';

            return canvas;
        }
        Initialization.initializeCanvas = initializeCanvas;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-canvas.js.map
