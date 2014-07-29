/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Initialization) {
        'use strict';

        function initializeColorSelections() {
            // set the first selections as the default
            $('#color-selector .foreground-container .color-container').first().click();
            $('#color-selector .background-container .color-container').first().click();
        }
        Initialization.initializeColorSelections = initializeColorSelections;
    })(Spirograph.Initialization || (Spirograph.Initialization = {}));
    var Initialization = Spirograph.Initialization;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=initialize-color-selections.js.map
