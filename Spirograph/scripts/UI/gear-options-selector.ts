/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    var containerSize = 35,
        fixedContainer = '#gear-options-selector .fixed-container .scroll-container',
        rotatingContainer = '#gear-options-selector .rotating-container .scroll-container';

    // add all the gear sizes to both lists
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

            gearSize += .4;

            return { originalGear: x, modifiedGear: gearOption };
        })
        .forEach((gear) => {

            [fixedContainer, rotatingContainer].forEach((container) => {
                var gearContainer = d3.select(container).append('div').attr({
                    'class': 'gear-container',
                    'data-tooth-count': gear.originalGear.toothCount
                });

                var svgContainer = gearContainer.append("svg").attr({
                    width: containerSize,
                    height: containerSize
                });

                gearContainer.append('div').attr('class', 'gear-label color-changing').html(gear.originalGear.toothCount);

                svgContainer.append('g')
                    .attr('class', 'gear fixed color-changing')
                    .attr("transform", "translate(" + containerSize / 2 + "," + containerSize / 2 + ")")
                    .datum(gear.modifiedGear)
                    .append("path")
                    .attr("d", Shapes.Gear);
            });
        });

    // add all the beam options to the list of fixed gears
    var endCapsToothCount = 8,
        totalToothCount = 16
    Enumerable.from((new Shapes.BeamOptionsFactory()).createAllOptions())
        .select(x => {
            var beamOption: Shapes.BeamOptions = {
                endCapsToothCount: endCapsToothCount,
                toothHeight: 2,
                totalToothCount: totalToothCount,
                toothWidth: 4
            };

            endCapsToothCount += 2;
            totalToothCount += 2;

            return { originalGear: x, modifiedGear: beamOption };
        })
        .forEach((beam) => {
            var gearContainer = d3.select(fixedContainer).append('div').attr({
                'class': 'gear-container',
                'data-tooth-count': beam.originalGear.totalToothCount
            });

            var svgContainer = gearContainer.append("svg").attr({
                width: containerSize,
                height: containerSize
            });

            gearContainer.append('div').attr('class', 'gear-label color-changing' + (beam.originalGear.totalToothCount > 99 ? ' small-label' : '')).html(beam.originalGear.totalToothCount);

            svgContainer.append('g')
                .attr('class', 'gear fixed color-changing')
                .attr("transform", "translate(" + containerSize / 2 + "," + containerSize / 2 + ")")
                .datum(beam.modifiedGear)
                .append("path")
                .attr("d", Shapes.Beam);
        });

    $('#gear-options-selector').on('click', '.gear-container', (ev) => {
        var $target = $(ev.currentTarget);
        $target.addClass('selected').siblings().removeClass('selected');
        var fixedOrRotating = $target.parents('.fixed-container').length !== 0 ? 'fixed' : 'rotating';

        EventAggregator.publish('gearSelected', $target.attr('data-tooth-count'), fixedOrRotating);
    });
}