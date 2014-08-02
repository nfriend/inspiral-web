/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    'use strict';

    // when changing these variables, make sure to change
    // the element's corresponding margin in the stylesheet
    Spirograph.canvasWidth = 1568;
    Spirograph.canvasHeight = 1008;
    Spirograph.svgWidth = 2560;
    Spirograph.svgHeight = 1440;

    function getSvgCenterY() {
        return Spirograph.svgHeight / 2;
    }
    Spirograph.getSvgCenterY = getSvgCenterY;

    function getSvgCenterX() {
        return Spirograph.svgWidth / 2;
    }
    Spirograph.getSvgCenterX = getSvgCenterX;

    function getCanvasCenterY() {
        return Spirograph.canvasHeight / 2;
    }
    Spirograph.getCanvasCenterY = getCanvasCenterY;

    function getCanvasCenterX() {
        return Spirograph.canvasWidth / 2;
    }
    Spirograph.getCanvasCenterX = getCanvasCenterX;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=dimensions.js.map
