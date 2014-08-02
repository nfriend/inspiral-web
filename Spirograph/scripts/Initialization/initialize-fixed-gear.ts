/// <reference path='../definitions/references.d.ts' />

module Spirograph.Initialization {
    'use strict';

    // TODO: don't hardcode RingGearOptions in method signature
    export function initializeFixedGear(svgContainer: D3.Selection, gearOptions: Shapes.RingGearOptions) {
        //var fixedGear = svgContainer.append('g')
        //    .attr('class', 'gear fixed color-changing')
        //    .attr("transform", "translate(" + getSvgCenterX() + "," + getSvgCenterY() + ")")
        //    .datum(fixedGearOptions)
        //    .append("path")
        //    .attr("d", Shapes.Gear);

        //var fixedGear = svgContainer.append('g')
        //    .attr('class', 'gear beam fixed color-changing')
        //    .attr("transform", "translate(" + getSvgCenterX() + "," + getSvgCenterY() + ")")
        //    .datum(beamOptions)
        //    .append("path")
        //    .attr("d", Shapes.Beam);

        var fixedGear = svgContainer.append("g")
            .attr("class", "gear ring-gear fixed color-changing")
            .attr("transform", "translate(" + getSvgCenterX() + "," + getSvgCenterY() + ")")
            .datum(gearOptions)
            .append("path")
            .attr("d", Shapes.RingGear);

        return fixedGear;
    }
} 