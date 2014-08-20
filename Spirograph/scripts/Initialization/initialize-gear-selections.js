/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        function initializeGearSelections() {
            // set up the defaults to be already selected
            $('#gear-options-selector .rotating-container .gear-container[data-tooth-count-1=' + Spirograph.defaults.rotatingGearToothCount + ']').click();
            $('#gear-options-selector .fixed-container .gear-container[data-tooth-count-1=' + Spirograph.defaults.fixedGearOuterToothCount + '][data-tooth-count-2=' + Spirograph.defaults.fixedGearInnerToothCount + ']').click();
        }
        Initialization.initializeGearSelections = initializeGearSelections;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-gear-selections.js.map
