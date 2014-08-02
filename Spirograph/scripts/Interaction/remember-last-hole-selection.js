/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
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
            } else {
                return Spirograph.defaults.holeIndex;
            }
        }
        Interaction.getHoleSelection = getHoleSelection;
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=remember-last-hole-selection.js.map
