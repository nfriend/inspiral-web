/// <reference path='../definitions/references.d.ts' />

module Spirograph.Initialization {
    'use strict';

    export function initializeSvg() {
        var svgContainer = d3.select("body")
            .append("svg")
            .attr({
                width: svgWidth,
                height: svgHeight,
                id: 'spirograph-svg'
            })

        return svgContainer;
    }
}  