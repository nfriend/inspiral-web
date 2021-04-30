/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        var _lastSelectedMappings = {};
        function saveHoleSelection(holeIndex, gearSize) {
            _lastSelectedMappings[gearSize] = holeIndex;
        }
        Interaction.saveHoleSelection = saveHoleSelection;
        function getHoleSelection(gearSize) {
            if (gearSize in _lastSelectedMappings) {
                return _lastSelectedMappings[gearSize];
            }
            else {
                return InspiralWeb.defaults.holeIndex;
            }
        }
        Interaction.getHoleSelection = getHoleSelection;
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=remember-last-hole-selection.js.map