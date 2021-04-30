/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Initialization {
    'use strict';

    export function initializeCursorTracker(svgContainer) {
        return svgContainer.append('line').attr({
            x1: getSvgCenterX(),
            y1: getSvgCenterY(),
            x2: getSvgCenterX(),
            y2: getSvgCenterY(),
            'class': 'cursor-tracker color-changing',
            'visibility': 'hidden'
        });
    }
}
