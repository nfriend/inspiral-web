/// <reference path='../definitions/references.d.ts' />

module Spirograph.Initialization {
    'use strict';

    export function initializeRotatingGear(svgContainer: D3.Selection, gearOptions: Shapes.GearOptions) {
        var rotatingGear = svgContainer.append("g")
            .attr("class", "gear color-changing")
            .datum(gearOptions);

        rotatingGear.append("path")
            .attr("d", Shapes.Gear);

        return rotatingGear;
    }
} 