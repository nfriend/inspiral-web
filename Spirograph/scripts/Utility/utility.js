/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Utility) {
        'use strict';

        function toRadians(degrees) {
            return (degrees * Math.PI) / 180;
        }
        Utility.toRadians = toRadians;

        function toDegrees(radians) {
            return (radians * 180) / Math.PI;
        }
        Utility.toDegrees = toDegrees;

        function toStandardCoords(coords, size, center) {
            if (!center) {
                var center = {
                    x: size.x / 2,
                    y: size.y / 2
                };
            }
            return {
                x: coords.x - center.x,
                y: -1 * (coords.y - center.y)
            };
        }
        Utility.toStandardCoords = toStandardCoords;

        function svgToCanvasCoords(coords) {
            return {
                x: coords.x - (Spirograph.svgWidth - Spirograph.canvasWidth) / 2,
                y: coords.y - (Spirograph.svgHeight - Spirograph.canvasHeight) / 2
            };
        }
        Utility.svgToCanvasCoords = svgToCanvasCoords;

        function getAverage(values) {
            var total = 0;
            values.forEach(function (v) {
                total += v;
            });
            return total / values.length;
        }
        Utility.getAverage = getAverage;

        function getRgbaString(r, g, b, a) {
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
        Utility.getRgbaString = getRgbaString;
    })(Spirograph.Utility || (Spirograph.Utility = {}));
    var Utility = Spirograph.Utility;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=utility.js.map
