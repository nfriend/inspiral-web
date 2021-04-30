/// <reference path='../definitions/references.d.ts' />
'use strict';
var InspiralWeb;
(function (InspiralWeb) {
    (function (Utility) {
        function changePenColor(r, g, b, a) {
            if (typeof a === "undefined") { a = 1; }
            var color = getRgbaString(r, g, b, a);
            injectStyleSheetChanges(color);
            changeContextStrokeStyle(color);
        }
        Utility.changePenColor = changePenColor;

        function injectStyleSheetChanges(color) {
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

        function getRgbaString(r, g, b, a) {
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
        Utility.getRgbaString = getRgbaString;
    })(InspiralWeb.Utility || (InspiralWeb.Utility = {}));
    var Utility = InspiralWeb.Utility;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=changePenColorStyle.js.map
