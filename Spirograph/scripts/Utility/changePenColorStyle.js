/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Utility) {
        function changePenColor(r, g, b, a) {
            if (typeof a === "undefined") { a = 1; }
            var color = getRGBAString(r, g, b, a);
            injectStyleSheetChanges(color);
            changeContextStrokeStyle(color);
        }
        Utility.changePenColor = changePenColor;

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

        function getRGBAString(r, g, b, a) {
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
    })(Spirograph.Utility || (Spirograph.Utility = {}));
    var Utility = Spirograph.Utility;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=changePenColorStyle.js.map
