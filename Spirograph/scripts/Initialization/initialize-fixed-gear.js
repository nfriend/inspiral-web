/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        // TODO: don't hardcode RingGearOptions in method signature
        function initializeFixedGear(svgContainer, gearOptions) {
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
            var fixedGear = svgContainer.append("g").attr("class", "gear ring-gear fixed color-changing").attr("transform", "translate(" + Spirograph.getSvgCenterX() + "," + Spirograph.getSvgCenterY() + ")").datum(gearOptions).append("path").attr("d", Spirograph.Shapes.RingGear);

            return fixedGear;
        }
        Initialization.initializeFixedGear = initializeFixedGear;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-fixed-gear.js.map
