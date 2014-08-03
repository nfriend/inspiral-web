/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    EventAggregator.subscribe('clearCanvas', () => {
        var canvas = <HTMLCanvasElement> d3.select('#spirograph-canvas').node();
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
} 