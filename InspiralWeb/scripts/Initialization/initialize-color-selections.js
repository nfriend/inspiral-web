/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Initialization;
    (function (Initialization) {
        'use strict';
        function initializeColorSelections() {
            // set the first selections as the default
            $('#color-selector .foreground-container .color-container').first().click();
            $('#color-selector .background-container .color-container').first().click();
        }
        Initialization.initializeColorSelections = initializeColorSelections;
    })(Initialization = InspiralWeb.Initialization || (InspiralWeb.Initialization = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=initialize-color-selections.js.map