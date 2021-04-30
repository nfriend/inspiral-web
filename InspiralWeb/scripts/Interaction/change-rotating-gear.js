/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        function changeRotatingGear(svgContainer, newGearOptions) {
            d3.selectAll('.gear.rotating').remove();
            var rotatingGear = svgContainer.append("g")
                .attr("class", "gear rotating color-changing" + (InspiralWeb.isInDarkMode ? ' dark' : ''))
                .style('visibility', InspiralWeb.areGearsVisible ? 'visible' : 'hidden')
                .datum(newGearOptions);
            rotatingGear.append("path")
                .attr("d", InspiralWeb.Shapes.Gear);
            return rotatingGear;
        }
        Interaction.changeRotatingGear = changeRotatingGear;
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=change-rotating-gear.js.map