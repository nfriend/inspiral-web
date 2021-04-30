/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Initialization {
    'use strict';

    export function initializeSvg() {
        var svgContainer = d3.select("body")
            .append("svg")
            .attr({
                width: svgWidth,
                height: svgHeight,
                id: 'inspiral-web-svg'
            })

        return svgContainer;
    }
}
