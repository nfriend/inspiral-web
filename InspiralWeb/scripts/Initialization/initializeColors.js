/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    (function (UI) {
        'use strict';

        function initializeColorSelections() {
            // set the first selections as the default
            $('#color-selector .foreground-container .color-container').first().click();
            $('#color-selector .background-container .color-container').first().click();
        }
        UI.initializeColorSelections = initializeColorSelections;
    })(InspiralWeb.UI || (InspiralWeb.UI = {}));
    var UI = InspiralWeb.UI;
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initializeColors.js.map
