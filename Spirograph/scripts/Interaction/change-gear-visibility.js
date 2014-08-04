/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (Interaction) {
        'use strict';

        Spirograph.EventAggregator.subscribe('gearVisibilityChange', function (newVisibility) {
            d3.selectAll('.gear.fixed, .gear.rotating').style('visibility', newVisibility ? 'visible' : 'hidden');
        });
    })(Spirograph.Interaction || (Spirograph.Interaction = {}));
    var Interaction = Spirograph.Interaction;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=change-gear-visibility.js.map
