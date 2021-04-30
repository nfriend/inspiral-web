﻿/// <reference path='definitions/references.d.ts' />
'use strict';
var InspiralWeb;
(function (InspiralWeb) {
    (function (Utility) {
        function toRadians(degrees) {
            return (degrees * Math.PI) / 180;
        }
        Utility.toRadians = toRadians;

        function toDegrees(radians) {
            return (radians * 180) / Math.PI;
        }
        Utility.toDegrees = toDegrees;

        function toStandardCoords(coords, size) {
            return {
                x: coords.x - size.x / 2,
                y: -1 * (coords.y - size.y / 2)
            };
        }
        Utility.toStandardCoords = toStandardCoords;

        function getCenterY() {
            return window.innerHeight / 2;
        }
        Utility.getCenterY = getCenterY;

        function getCenterX() {
            return window.innerWidth / 2;
        }
        Utility.getCenterX = getCenterX;

        function getAverage(values) {
            var total = 0;
            values.forEach(function (v) {
                total += v;
            });
            return total / values.length;
        }
        Utility.getAverage = getAverage;
    })(InspiralWeb.Utility || (InspiralWeb.Utility = {}));
    var Utility = InspiralWeb.Utility;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=utility.js.map
