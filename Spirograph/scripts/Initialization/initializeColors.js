/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        function initializeColorSelections() {
            // set the first selections as the default
            $('#color-selector .foreground-container .color-container').first().click();
            $('#color-selector .background-container .color-container').first().click();
        }
        UI.initializeColorSelections = initializeColorSelections;
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initializeColors.js.map
