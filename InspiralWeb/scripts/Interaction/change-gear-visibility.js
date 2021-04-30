/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Interaction;
    (function (Interaction) {
        'use strict';
        InspiralWeb.EventAggregator.subscribe('gearVisibilityChange', function (newVisibility) {
            d3.selectAll('.gear.fixed, .gear.rotating')
                .style('visibility', newVisibility ? 'visible' : 'hidden');
        });
    })(Interaction = InspiralWeb.Interaction || (InspiralWeb.Interaction = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=change-gear-visibility.js.map