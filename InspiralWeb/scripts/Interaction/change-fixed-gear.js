/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        function changeFixedGear(svgContainer, newGearType, newGearOptions) {
            d3.selectAll('.gear.fixed').remove();
            if (newGearType == InspiralWeb.Shapes.GearType.Beam) {
                var shapeToMake = InspiralWeb.Shapes.Beam;
            }
            else if (newGearType == InspiralWeb.Shapes.GearType.Gear) {
                var shapeToMake = InspiralWeb.Shapes.Gear;
            }
            else if (newGearType == InspiralWeb.Shapes.GearType.RingGear) {
                var shapeToMake = InspiralWeb.Shapes.RingGear;
            }
            var fixedGear = svgContainer.append("g")
                .attr("class", "gear ring-gear fixed color-changing" + (InspiralWeb.isInDarkMode ? ' dark' : ''))
                .attr("transform", "translate(" + InspiralWeb.getSvgCenterX() + "," + InspiralWeb.getSvgCenterY() + ")")
                .style('visibility', InspiralWeb.areGearsVisible ? 'visible' : 'hidden')
                .datum(newGearOptions)
                .append("path")
                .attr("d", shapeToMake);
            return fixedGear;
        }
        Interaction.changeFixedGear = changeFixedGear;
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=change-fixed-gear.js.map