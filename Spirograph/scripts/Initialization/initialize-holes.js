/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        function initializeHoles(gear, gearOptions) {
            var allHoleOptions = (new Spirograph.Shapes.GearHoleGenerator()).generate(gearOptions);
            var holeOptions;
            allHoleOptions.forEach(function (hole, index) {
                var holeObject = gear.append('path').attr('class', 'gear-hole').datum(hole).attr('d', Spirograph.Shapes.GearHole);

                holeObject.on('click', function () {
                    d3.selectAll('.selected').classed('selected', false);
                    holeObject.classed('selected', true);

                    holeOptions = hole;

                    Spirograph.EventAggregator.publish('holeSelected', hole);
                    //initializeGearAndPen(false);
                });
            });

            return holeOptions;
        }
        Initialization.initializeHoles = initializeHoles;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-holes.js.map
