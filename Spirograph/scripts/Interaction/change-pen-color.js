/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        function changePenColor(r, g, b, a) {
            if (typeof a === "undefined") { a = 1; }
            var color = Spirograph.Utility.getRgbaString(r, g, b, a);
            injectStyleSheetChanges(color);
            changeContextStrokeStyle(color);
        }

        function injectStyleSheetChanges(color) {
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
            }
        });
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=change-pen-color.js.map
