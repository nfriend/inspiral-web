/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    EventAggregator.subscribe('downloadImage', () => {
        var canvas = <HTMLCanvasElement> d3.select('#spirograph-canvas').node();
        $.ajax({
            type: 'POST',
            url: 'http://nathanfriend.com/saveimage.php',
            data: {
                img: canvas.toDataURL()
            },
            success: (imagename) => {
                location.href = "http://nathanfriend.com/getimage.php?imagename=" + imagename;
            }
        });
    });
}  