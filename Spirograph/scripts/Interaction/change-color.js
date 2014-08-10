/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        function changePenColor(r, g, b, a) {
            if (typeof a === "undefined") { a = 1; }
            var color = Spirograph.Utility.getRgbaString(r, g, b, a);
            injectPenColorStyleSheetChanges(color);
            changeContextStrokeStyle(color);
        }

        function changeBackgroundColor(r, g, b, a) {
            if (typeof a === "undefined") { a = 1; }
            $('body').css('background-color', Spirograph.Utility.getRgbaString(r, g, b, a));

            if (a > .60 && (r < 100 && g < 100 && b < 100)) {
                Spirograph.isInDarkMode = true;
            } else {
                Spirograph.isInDarkMode = false;
            }
            d3.selectAll('.color-changing, body').classed('dark', Spirograph.isInDarkMode);
        }

        function injectPenColorStyleSheetChanges(color) {
            $('.injected-style').remove();

            var htmlString = new Array();
            htmlString.push('<style class="injected-style">');
            htmlString.push('.spirograph .gear .gear-hole:hover { fill: ' + color + '; stroke: ' + color + '; }');
            htmlString.push('.spirograph .gear .gear-hole.selected { fill: ' + color + '; }');
            htmlString.push('.spirograph .gear.dragging .gear-hole.selected { fill: ' + color + '; }');
            htmlString.push('</style>');

            var div = $(htmlString.join('')).appendTo("body");
        }

        function changeContextStrokeStyle(color) {
            var ctx = d3.select('canvas').node().getContext('2d');
            ctx.strokeStyle = color;
        }

        Spirograph.EventAggregator.subscribe('colorSelected', function (r, g, b, a, foregroundOrBackground) {
            if (foregroundOrBackground === 'foreground') {
                changePenColor(r, g, b, a);
            } else {
                changeBackgroundColor(r, g, b, a);
            }
        });
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=change-color.js.map
