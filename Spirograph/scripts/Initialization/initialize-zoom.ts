/// <reference path='../definitions/references.d.ts' />

module Spirograph {
    export var scaleFactor: number = 1;
}

module Spirograph.Initialization {
    'use strict';

    var minZoom = .3;
    var maxZoom = 4;
    var zoomMultiplier = 1.2;

    export function initializeZoom(canvas: HTMLCanvasElement, svg: SVGElement) {

        $(window).on('mousewheel', (ev) => {

            if ((<any>ev).deltaY > 0) {
                // if we're zooming in
                if (!(scaleFactor * zoomMultiplier > maxZoom)) {
                    scaleFactor *= zoomMultiplier;

                    EventAggregator.publish('zoomed', scaleFactor);
                }
            } else {
                // if we're zooming out
                if (!(scaleFactor / zoomMultiplier < minZoom)) {
                    scaleFactor /= zoomMultiplier;

                    EventAggregator.publish('zoomed', scaleFactor);
                }
            }

            $(canvas).add(svg).css({
                transform: 'scale(' + scaleFactor + ')'
            });

        });
    }
}