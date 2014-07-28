/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        var minZoom = .3;
        var maxZoom = 4;
        var zoomMultiplier = 1.2;

        var scale = 1;

        function initializeZoom(canvas, svg) {
            $(window).on('mousewheel', function (ev) {
                if (ev.deltaY > 0) {
                    // if we're zooming in
                    if (!(scale * zoomMultiplier > maxZoom)) {
                        scale *= zoomMultiplier;
                    }
                } else {
                    // if we're zooming out
                    if (!(scale / zoomMultiplier < minZoom)) {
                        scale /= zoomMultiplier;
                    }
                }

                $(canvas).add(svg).css({
                    transform: 'scale(' + scale + ')'
                });
            });
        }
        Interaction.initializeZoom = initializeZoom;
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=zooming.js.map
