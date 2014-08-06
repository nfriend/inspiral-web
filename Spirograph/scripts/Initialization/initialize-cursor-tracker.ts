/// <reference path='../definitions/references.d.ts' />

module Spirograph.Initialization {
    'use strict';

    export function initializeCursorTracker(svgContainer: D3.Selection) {
        return svgContainer.append('line').attr({
            x1: getSvgCenterX(),
            y1: getSvgCenterY(),
            x2: getSvgCenterX(),
            y2: getSvgCenterY(),
            'class': 'cursor-tracker color-changing'
        });
    }
}