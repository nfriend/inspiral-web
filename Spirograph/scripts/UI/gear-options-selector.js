/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        var containerSize = 35;
        var gearSize = 5;

        Enumerable.from((new Spirograph.Shapes.GearOptionsFactory()).createAllOptions()).select(function (x) {
            var gearOption = {
                holeCount: 0,
                holePositionBuffer: 0,
                holeRadius: 0,
                holeSweepAngle: 0,
                radius: gearSize,
                toothCount: Math.floor(gearSize + 4),
                toothHeight: 3
            };

            gearSize += .5;

            return { originalGear: x, modifiedGear: gearOption };
        }).forEach(function (gear) {
            ['#gear-options-selector .fixed-container', '#gear-options-selector .rotating-container'].forEach(function (container) {
                var gearContainer = d3.select(container).append('div').attr({
                    'class': 'gear-container',
                    'data-tooth-count': gear.originalGear.toothCount
                });

                var svgContainer = gearContainer.append("svg").attr({
                    width: containerSize,
                    height: containerSize
                });

                gearContainer.append('div').attr('class', 'gear-label').html(gear.originalGear.toothCount);

                svgContainer.append('g').attr('class', 'gear fixed').attr("transform", "translate(" + containerSize / 2 + "," + containerSize / 2 + ")").datum(gear.modifiedGear).append("path").attr("d", Spirograph.Shapes.Gear);
            });
        });

        $('#gear-options-selector').on('click', '.gear-container', function (ev) {
            var $target = $(ev.currentTarget);
            $target.addClass('selected').siblings().removeClass('selected');
            var fixedOrRotating = $target.parent('.fixed-container').length !== 0 ? 'fixed' : 'rotating';

            Spirograph.EventAggregator.publish('gearSelected', $target.attr('data-tooth-count'), fixedOrRotating);
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=gear-options-selector.js.map
