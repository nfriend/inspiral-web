/// <reference path='../definitions/references.d.ts' />

module Spirograph.Initialization {
    'use strict';

    export function initializeCanvas() {
        var canvas = d3.select("body")
            .append("canvas")
            .attr({
                id: 'spirograph-canvas',
                width: canvasWidth,
                height: canvasHeight
            });

        var ctx = (<HTMLCanvasElement> canvas.node()).getContext('2d');
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        return canvas;
    }
} 