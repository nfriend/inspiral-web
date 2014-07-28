/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    var minZoom = .3;
    var maxZoom = 4;
    var zoomMultiplier = 1.2;

    var scale: number = 1;

    export function initializeZoom(canvas: HTMLCanvasElement, svg: SVGElement) {

        $(window).on('mousewheel', (ev) => {
            if ((<any>ev).deltaY > 0) {
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
}