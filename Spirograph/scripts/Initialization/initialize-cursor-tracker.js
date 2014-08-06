/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        function initializeCursorTracker(svgContainer) {
            return svgContainer.append('line').attr({
                x1: Spirograph.getSvgCenterX(),
                y1: Spirograph.getSvgCenterY(),
                x2: Spirograph.getSvgCenterX(),
                y2: Spirograph.getSvgCenterY(),
                'class': 'cursor-tracker color-changing'
            });
        }
        Initialization.initializeCursorTracker = initializeCursorTracker;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-cursor-tracker.js.map
