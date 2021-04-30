/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Interaction {
    'use strict';

    EventAggregator.subscribe('clearCanvas', () => {
        var canvas = <HTMLCanvasElement> d3.select('#inspiral-web-canvas').node();
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}
