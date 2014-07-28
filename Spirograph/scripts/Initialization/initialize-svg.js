/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        function initializeSvg() {
            var svgContainer = d3.select("body").append("svg").attr({
                width: Spirograph.svgWidth,
                height: Spirograph.svgHeight,
                id: 'spirograph-svg'
            });

            return svgContainer;
        }
        Initialization.initializeSvg = initializeSvg;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-svg.js.map
