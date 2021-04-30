/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Initialization;
    (function (Initialization) {
        'use strict';
        function initializeGearSelections() {
            // set up the defaults to be already selected
            $('#gear-options-selector .rotating-container .gear-container[data-tooth-count-1=' + InspiralWeb.defaults.rotatingGearToothCount + ']').click();
            $('#gear-options-selector .fixed-container .gear-container[data-tooth-count-1=' + InspiralWeb.defaults.fixedGearOuterToothCount + '][data-tooth-count-2=' + InspiralWeb.defaults.fixedGearInnerToothCount + ']').click();
        }
        Initialization.initializeGearSelections = initializeGearSelections;
    })(Initialization = InspiralWeb.Initialization || (InspiralWeb.Initialization = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initialize-gear-selections.js.map