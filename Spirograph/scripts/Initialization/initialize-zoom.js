/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    Spirograph.scaleFactor = 1;
})(Spirograph || (Spirograph = {}));

var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        var minZoom = .3;
        var maxZoom = 4;
        var zoomMultiplier = 1.2;

        function initializeZoom(canvas, svg) {
            $(window).on('mousewheel', function (ev) {
                if (ev.deltaY > 0) {
                    // if we're zooming in
                    if (!(Spirograph.scaleFactor * zoomMultiplier > maxZoom)) {
                        Spirograph.scaleFactor *= zoomMultiplier;

                        Spirograph.EventAggregator.publish('zoomed', Spirograph.scaleFactor);
                    }
                } else {
                    // if we're zooming out
                    if (!(Spirograph.scaleFactor / zoomMultiplier < minZoom)) {
                        Spirograph.scaleFactor /= zoomMultiplier;

                        Spirograph.EventAggregator.publish('zoomed', Spirograph.scaleFactor);
                    }
                }

                $(canvas).add(svg).css({
                    transform: 'scale(' + Spirograph.scaleFactor + ')'
                });
            });
        }
        Initialization.initializeZoom = initializeZoom;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-zoom.js.map
