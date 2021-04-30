/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Interaction {
    'use strict';

    export function changeFixedGear(svgContainer, newGearType: Shapes.GearType, newGearOptions) {

        d3.selectAll('.gear.fixed').remove();

        if (newGearType == Shapes.GearType.Beam) {
            var shapeToMake: any = Shapes.Beam;
        } else if (newGearType == Shapes.GearType.Gear) {
            var shapeToMake: any = Shapes.Gear;
        } else if (newGearType == Shapes.GearType.RingGear) {
            var shapeToMake: any = Shapes.RingGear;
        }

        var fixedGear = svgContainer.append("g")
            .attr("class", "gear ring-gear fixed color-changing" + (isInDarkMode ? ' dark' : ''))
            .attr("transform", "translate(" + getSvgCenterX() + "," + getSvgCenterY() + ")")
            .style('visibility', areGearsVisible ? 'visible' : 'hidden')
            .datum(newGearOptions)
            .append("path")
            .attr("d", shapeToMake);

        return fixedGear;
    }
}
