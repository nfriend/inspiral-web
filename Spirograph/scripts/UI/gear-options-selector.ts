/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.UI {

    var containerSize = 35;
    var gearSize = 5;

    Enumerable.from((new Shapes.GearOptionsFactory()).createAllOptions())
        .select(x => {

            var gearOption: Shapes.GearOptions = {
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
        })
        .forEach((gear) => {

            ['#gear-options-selector .fixed-container', '#gear-options-selector .rotating-container'].forEach((container) => {
                var gearContainer = d3.select(container).append('div').attr({
                    'class': 'gear-container',
                    'data-tooth-count': gear.originalGear.toothCount
                });

                var svgContainer = gearContainer.append("svg").attr({
                    width: containerSize,
                    height: containerSize
                });

                gearContainer.append('div').attr('class', 'gear-label').html(gear.originalGear.toothCount);

                svgContainer.append('g')
                    .attr('class', 'gear fixed')
                    .attr("transform", "translate(" + containerSize / 2 + "," + containerSize / 2 + ")")
                    .datum(gear.modifiedGear)
                    .append("path")
                    .attr("d", Shapes.Gear);
            });
        });

    $('.gear-container').on('click', (ev) => {
        var $target = $(ev.delegateTarget);
        $target.addClass('selected');
        $target.siblings().removeClass('selected');
        var fixedOrRotating = $target.parent('.fixed-container').length !== 0 ? 'fixed' : 'rotating';

        EventAggregator.publish('gearSelected', $target.attr('data-tooth-count'), fixedOrRotating);
    });
}