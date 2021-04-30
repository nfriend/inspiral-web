/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Initialization;
    (function (Initialization) {
        'use strict';
        function initializeRotatingGear(svgContainer, gearOptions) {
            var rotatingGear = svgContainer.append("g")
                .attr("class", "gear rotating color-changing")
                .datum(gearOptions);
            rotatingGear.append("path")
                .attr("d", InspiralWeb.Shapes.Gear);
            return rotatingGear;
        }
        Initialization.initializeRotatingGear = initializeRotatingGear;
    })(Initialization = InspiralWeb.Initialization || (InspiralWeb.Initialization = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initialize-rotating-gear.js.map