/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Initialization {
    'use strict';

    export function initializeRotatingGear(svgContainer, gearOptions: Shapes.GearOptions) {
        var rotatingGear = svgContainer.append("g")
            .attr("class", "gear rotating color-changing")
            .datum(gearOptions);

        rotatingGear.append("path")
            .attr("d", Shapes.Gear);

        return rotatingGear;
    }
}
