/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    (function (Interaction) {
        'use strict';

        var minZoom = .3;
        var maxZoom = 4;
        var zoomMultiplier = 1.2;

        Interaction.scaleFactor = 1;

        function initializeZoom(canvas, svg) {
            $(window).on('mousewheel', function (ev) {
                if (ev.deltaY > 0) {
                    // if we're zooming in
                    if (!(Interaction.scaleFactor * zoomMultiplier > maxZoom)) {
                        Interaction.scaleFactor *= zoomMultiplier;
                    }
                } else {
                    // if we're zooming out
                    if (!(Interaction.scaleFactor / zoomMultiplier < minZoom)) {
                        Interaction.scaleFactor /= zoomMultiplier;
                    }
                }

                $(canvas).add(svg).css({
                    transform: 'scale(' + Interaction.scaleFactor + ')'
                });
            });
        }
        Interaction.initializeZoom = initializeZoom;
    })(InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
    var Interaction = InspiralWeb.Interaction;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=zooming.js.map
