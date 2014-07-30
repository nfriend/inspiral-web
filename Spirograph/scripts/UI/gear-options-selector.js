/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

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

            gearSize += .4;

            return { originalGear: x, modifiedGear: gearOption };
        }).forEach(function (gear) {
            ['#gear-options-selector .fixed-container .scroll-container', '#gear-options-selector .rotating-container .scroll-container'].forEach(function (container) {
                var gearContainer = d3.select(container).append('div').attr({
                    'class': 'gear-container',
                    'data-tooth-count': gear.originalGear.toothCount
                });

                var svgContainer = gearContainer.append("svg").attr({
                    width: containerSize,
                    height: containerSize
                });

                gearContainer.append('div').attr('class', 'gear-label color-changing').html(gear.originalGear.toothCount);

                svgContainer.append('g').attr('class', 'gear fixed color-changing').attr("transform", "translate(" + containerSize / 2 + "," + containerSize / 2 + ")").datum(gear.modifiedGear).append("path").attr("d", Spirograph.Shapes.Gear);
            });
        });

        $('#gear-options-selector').on('click', '.gear-container', function (ev) {
            var $target = $(ev.currentTarget);
            $target.addClass('selected').siblings().removeClass('selected');
            var fixedOrRotating = $target.parents('.fixed-container').length !== 0 ? 'fixed' : 'rotating';

            Spirograph.EventAggregator.publish('gearSelected', $target.attr('data-tooth-count'), fixedOrRotating);
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=gear-options-selector.js.map
