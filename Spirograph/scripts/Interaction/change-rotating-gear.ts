/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    export function changeRotatingGear(svgContainer: D3.Selection, newGearOptions: Shapes.GearOptions) {

        d3.selectAll('.gear.rotating').remove();

        var rotatingGear = svgContainer.append("g")
            .attr("class", "gear rotating color-changing" + (isInDarkMode ? ' dark' : ''))
            .style('visibility', areGearsVisible ? 'visible' : 'hidden')
            .datum(newGearOptions);

        rotatingGear.append("path")
            .attr("d", Shapes.Gear);

        return rotatingGear;
    }
}