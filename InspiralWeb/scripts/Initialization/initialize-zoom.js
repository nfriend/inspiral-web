/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    InspiralWeb.scaleFactor = 1;
})(InspiralWeb || (InspiralWeb = {}));
(function (InspiralWeb) {
    var Initialization;
    (function (Initialization) {
        'use strict';
        var minZoom = .3;
        var maxZoom = 4;
        var zoomMultiplier = 1.2;
        function initializeZoom(canvas, svg) {
            $(window).on('mousewheel', function (ev) {
                if (ev.deltaY > 0) {
                    // if we're zooming in
                    if (!(InspiralWeb.scaleFactor * zoomMultiplier > maxZoom)) {
                        InspiralWeb.scaleFactor *= zoomMultiplier;
                    }
                }
                else {
                    // if we're zooming out
                    if (!(InspiralWeb.scaleFactor / zoomMultiplier < minZoom)) {
                        InspiralWeb.scaleFactor /= zoomMultiplier;
                    }
                }
                $(canvas).add(svg).css({
                    transform: 'scale(' + InspiralWeb.scaleFactor + ')'
                });
            });
        }
        Initialization.initializeZoom = initializeZoom;
    })(Initialization = InspiralWeb.Initialization || (InspiralWeb.Initialization = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initialize-zoom.js.map