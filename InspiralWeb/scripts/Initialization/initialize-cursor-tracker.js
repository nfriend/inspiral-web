/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Initialization;
    (function (Initialization) {
        'use strict';
        function initializeCursorTracker(svgContainer) {
            return svgContainer.append('line').attr({
                x1: InspiralWeb.getSvgCenterX(),
                y1: InspiralWeb.getSvgCenterY(),
                x2: InspiralWeb.getSvgCenterX(),
                y2: InspiralWeb.getSvgCenterY(),
                'class': 'cursor-tracker color-changing',
                'visibility': 'hidden'
            });
        }
        Initialization.initializeCursorTracker = initializeCursorTracker;
    })(Initialization = InspiralWeb.Initialization || (InspiralWeb.Initialization = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initialize-cursor-tracker.js.map