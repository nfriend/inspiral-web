/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        function changePenColor(r, g, b, a) {
            if (a === void 0) { a = 1; }
            var color = InspiralWeb.Utility.getRgbaString(r, g, b, a);
            injectPenColorStyleSheetChanges(color);
            changeContextStrokeStyle(color);
        }
        function changeBackgroundColor(r, g, b, a) {
            if (a === void 0) { a = 1; }
            $('body').css('background-color', InspiralWeb.Utility.getRgbaString(r, g, b, a));
            if (a > .60 && (r < 100 && g < 100 && b < 100)) {
                InspiralWeb.isInDarkMode = true;
            }
            else {
                InspiralWeb.isInDarkMode = false;
            }
            d3.selectAll('.color-changing, body').classed('dark', InspiralWeb.isInDarkMode);
        }
        function injectPenColorStyleSheetChanges(color) {
            $('.injected-style').remove();
            var htmlString = new Array();
            htmlString.push('<style class="injected-style">');
            htmlString.push('.inspiral-web .gear .gear-hole:hover { fill: ' + color + '; stroke: ' + color + '; }');
            htmlString.push('.inspiral-web .gear .gear-hole.selected { fill: ' + color + '; }');
            htmlString.push('.inspiral-web .gear.dragging .gear-hole.selected { fill: ' + color + '; }');
            htmlString.push('</style>');
            var div = $(htmlString.join('')).appendTo("body");
        }
        function changeContextStrokeStyle(color) {
            var ctx = d3.select('canvas').node().getContext('2d');
            ctx.strokeStyle = color;
        }
        InspiralWeb.EventAggregator.subscribe('colorSelected', function (r, g, b, a, foregroundOrBackground) {
            if (foregroundOrBackground === 'foreground') {
                changePenColor(r, g, b, a);
            }
            else {
                changeBackgroundColor(r, g, b, a);
            }
        });
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=change-color.js.map