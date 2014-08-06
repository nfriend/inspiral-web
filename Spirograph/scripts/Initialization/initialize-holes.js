/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        var initiallySelectedHoleObject = null;

        function initializeHoles(gear, gearOptions, selectedIndex) {
            var allHoleOptions = (new Spirograph.Shapes.GearHoleGenerator()).generate(gearOptions);
            var holeOptions;
            allHoleOptions.forEach(function (hole, index) {
                var holeObject = gear.append('path').attr('class', 'gear-hole').datum(hole).attr('d', Spirograph.Shapes.GearHole);

                holeObject.on('mousedown', function () {
                    d3.event.stopPropagation();
                });

                holeObject.on('click', function () {
                    d3.selectAll('.gear-hole.selected').classed('selected', false);
                    holeObject.classed('selected', true);

                    Spirograph.EventAggregator.publish('holeSelected', hole);
                    Spirograph.Interaction.saveHoleSelection(index, gearOptions.toothCount);
                });

                if (index === selectedIndex) {
                    // store this for later, when we need it to set it as the default
                    initiallySelectedHoleObject = holeObject;

                    // also return the hole to be selected right now, so that we can perform initialization calculations on it
                    holeOptions = hole;
                }
            });

            return holeOptions;
        }
        Initialization.initializeHoles = initializeHoles;

        function initializeHoleSelection() {
            if (initiallySelectedHoleObject === null) {
                throw 'initializeHoleSelection must be called after a call to initializeHoles';
            }

            initiallySelectedHoleObject.on('click')();
        }
        Initialization.initializeHoleSelection = initializeHoleSelection;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-holes.js.map
