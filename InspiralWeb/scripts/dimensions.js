/// <reference path='definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    'use strict';
    // when changing these variables, make sure to change
    // the element's corresponding margin in the stylesheet
    // as well as the PHP script that creates thumbnails
    InspiralWeb.canvasWidth = 1568;
    InspiralWeb.canvasHeight = 1108;
    InspiralWeb.svgWidth = 2560;
    InspiralWeb.svgHeight = 1440;
    function getSvgCenterY() {
        return InspiralWeb.svgHeight / 2;
    }
    InspiralWeb.getSvgCenterY = getSvgCenterY;
    function getSvgCenterX() {
        return InspiralWeb.svgWidth / 2;
    }
    InspiralWeb.getSvgCenterX = getSvgCenterX;
    function getCanvasCenterY() {
        return InspiralWeb.canvasHeight / 2;
    }
    InspiralWeb.getCanvasCenterY = getCanvasCenterY;
    function getCanvasCenterX() {
        return InspiralWeb.canvasWidth / 2;
    }
    InspiralWeb.getCanvasCenterX = getCanvasCenterX;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=dimensions.js.map