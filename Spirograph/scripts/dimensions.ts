/// <reference path='definitions/references.d.ts' />

module Spirograph {
    'use strict';

    // when changing these variables, make sure to change 
    // the element's corresponding margin in the stylesheet 

    export var canvasWidth = 1568;
    export var canvasHeight = 712;
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