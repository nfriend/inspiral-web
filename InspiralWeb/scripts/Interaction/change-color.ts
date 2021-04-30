/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Interaction {
    'use strict';

    function changePenColor(r: number, g: number, b: number, a: number = 1) {
        var color = Utility.getRgbaString(r, g, b, a);
        injectPenColorStyleSheetChanges(color);
        changeContextStrokeStyle(color);
    }

    function changeBackgroundColor(r: number, g: number, b: number, a: number = 1) {
        $('body').css('background-color', Utility.getRgbaString(r, g, b, a));

        if (a > .60 && (r < 100 && g < 100 && b < 100)) {
            isInDarkMode = true;
        } else {
            isInDarkMode = false
        }
        d3.selectAll('.color-changing, body').classed('dark', isInDarkMode);
    }

    function injectPenColorStyleSheetChanges(color: string) {
        $('.injected-style').remove();

        var htmlString = new Array<string>();
        htmlString.push('<style class="injected-style">');
        htmlString.push('.inspiral-web .gear .gear-hole:hover { fill: ' + color + '; stroke: ' + color + '; }');
        htmlString.push('.inspiral-web .gear .gear-hole.selected { fill: ' + color + '; }');
        htmlString.push('.inspiral-web .gear.dragging .gear-hole.selected { fill: ' + color + '; }');
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
