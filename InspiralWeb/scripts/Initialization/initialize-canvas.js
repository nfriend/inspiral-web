/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Initialization;
    (function (Initialization) {
        'use strict';
        function initializeCanvas() {
            var canvas = d3.select("body")
                .append("canvas")
                .attr({
                id: 'inspiral-web-canvas',
                width: InspiralWeb.canvasWidth,
                height: InspiralWeb.canvasHeight
            });
            var ctx = canvas.node().getContext('2d');
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            return canvas;
        }
        Initialization.initializeCanvas = initializeCanvas;
    })(Initialization = InspiralWeb.Initialization || (InspiralWeb.Initialization = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initialize-canvas.js.map