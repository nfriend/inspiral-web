/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    function changePenColor(r: number, g: number, b: number, a: number = 1) {
        var color = Utility.getRgbaString(r, g, b, a);
        injectPenColorStyleSheetChanges(color);
        changeContextStrokeStyle(color);
    }

    function changeBackgroundColor(r: number, g: number, b: number, a: number = 1) {
        $('body').css('background-color', Utility.getRgbaString(r, g, b, a));

        if (r < 100 && g < 100 && b < 100) {
            d3.selectAll('.color-changing').classed('dark', true);
        } else {
            d3.selectAll('.color-changing').classed('dark', false);
        }
    }

    function injectPenColorStyleSheetChanges(color: string) {
        $('.injected-style').remove();

        var htmlString = new Array<string>();
        htmlString.push('<style class="injected-style">');
        htmlString.push('.spirograph .gear .gear-hole:hover { fill: ' + color + '; stroke: ' + color + '; }');
        htmlString.push('.spirograph .gear .gear-hole.selected { fill: ' + color + '; }');
        htmlString.push('.spirograph .gear.dragging .gear-hole.selected { fill: ' + color + '; }');
        htmlString.push('</style>');

        var div = $(htmlString.join('')).appendTo("body");
    }

    function changeContextStrokeStyle(color: string) {
        var ctx = (<HTMLCanvasElement> d3.select('canvas').node()).getContext('2d');
        ctx.strokeStyle = color;
    }

    EventAggregator.subscribe('colorSelected', (r: number, g: number, b: number, a: number, foregroundOrBackground: string) => {
        if (foregroundOrBackground === 'foreground') {
            changePenColor(r, g, b, a);
        } else {
            changeBackgroundColor(r, g, b, a);
        }
    });
} 