/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        InspiralWeb.EventAggregator.subscribe('clearCanvas', function () {
            var canvas = d3.select('#inspiral-web-canvas').node();
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=clear-canvas.js.map