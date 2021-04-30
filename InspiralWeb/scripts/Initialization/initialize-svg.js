/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Initialization;
    (function (Initialization) {
        'use strict';
        function initializeSvg() {
            var svgContainer = d3.select("body")
                .append("svg")
                .attr({
                width: InspiralWeb.svgWidth,
                height: InspiralWeb.svgHeight,
                id: 'inspiral-web-svg'
            });
            return svgContainer;
        }
        Initialization.initializeSvg = initializeSvg;
    })(Initialization = InspiralWeb.Initialization || (InspiralWeb.Initialization = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initialize-svg.js.map