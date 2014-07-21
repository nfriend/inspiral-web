/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Utility {
    export function changePenColor(r: number, g: number, b: number, a: number = 1) {
        var color = getRGBAString(r, g, b, a);
        injectStyleSheetChanges(color);
        changeContextStrokeStyle(color);
    }

    function injectStyleSheetChanges(color: string) {
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

    function getRGBAString(r: number, g: number, b: number, a: number) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
} 