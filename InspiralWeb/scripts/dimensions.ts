/// <reference path='definitions/references.d.ts' />

module InspiralWeb {
    'use strict';

    // when changing these variables, make sure to change
    // the element's corresponding margin in the stylesheet
    // as well as the PHP script that creates thumbnails

    export var canvasWidth = 1568;
    export var canvasHeight = 1108;
    export var svgWidth = 2560;
    export var svgHeight = 1440;

    export function getSvgCenterY() {
        return svgHeight / 2;
    }

    export function getSvgCenterX() {
        return svgWidth / 2;
    }

    export function getCanvasCenterY() {
        return canvasHeight / 2;
    }

    export function getCanvasCenterX() {
        return canvasWidth / 2;
    }
}
