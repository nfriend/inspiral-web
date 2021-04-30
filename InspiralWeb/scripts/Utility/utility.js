/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Utility;
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
                x: coords.x - (InspiralWeb.svgWidth - InspiralWeb.canvasWidth) / 2,
                y: coords.y - (InspiralWeb.svgHeight - InspiralWeb.canvasHeight) / 2
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
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        function convertToHumanReadableDate(dateToConvert) {
            var output = [];
            output.push(monthNames[dateToConvert.getMonth()]);
            output.push(dateToConvert.getDate() + ',');
            output.push(dateToConvert.getFullYear() + ',');
            var hours = dateToConvert.getHours() % 12;
            hours = hours === 0 ? 12 : hours;
            var minutes = (dateToConvert.getMinutes());
            minutes = minutes < 10 ? '0' + minutes : minutes;
            output.push(hours + ':' + minutes);
            output.push(dateToConvert.getHours() < 12 ? "AM" : "PM");
            return output.join(' ');
        }
        Utility.convertToHumanReadableDate = convertToHumanReadableDate;
        // from http://stackoverflow.com/a/11150727/1063392
        function convertToMysqlFriendlyString(date) {
            return date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' +
                ('00' + date.getUTCHours()).slice(-2) + ':' +
                ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                ('00' + date.getUTCSeconds()).slice(-2);
        }
        Utility.convertToMysqlFriendlyString = convertToMysqlFriendlyString;
    })(Utility = InspiralWeb.Utility || (InspiralWeb.Utility = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=utility.js.map