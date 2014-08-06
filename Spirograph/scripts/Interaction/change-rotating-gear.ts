/// <reference path='../definitions/references.d.ts' />

module Spirograph.Interaction {
    'use strict';

    export function changeRotatingGear(svgContainer: D3.Selection, newGearOptions: Shapes.GearOptions) {

        d3.selectAll('.gear.rotating').remove();

        var isDarkMode = $('body').is('.dark');

        var rotatingGear = svgContainer.append("g")
            .attr("class", "gear rotating color-changing" + (isDarkMode ? ' dark' : ''))
            .datum(newGearOptions);

        rotatingGear.append("path")
            .attr("d", Shapes.Gear);

        return rotatingGear;
    }
}