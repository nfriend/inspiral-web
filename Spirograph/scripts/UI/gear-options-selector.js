/// <reference path='../definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    (function (UI) {
        'use strict';

        var containerSize = 35, fixedContainer = '#gear-options-selector .fixed-container .scroll-container', rotatingContainer = '#gear-options-selector .rotating-container .scroll-container';

        // add all the gear sizes to both lists
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
        }).orderBy(function (x) {
            return x.originalGear.toothCount;
        }).forEach(function (gear) {
            [fixedContainer, rotatingContainer].forEach(function (container) {
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

        // add all the beam options to the list of fixed gears
        var endCapsToothCount = 8, totalToothCount = 16;
        Enumerable.from((new Spirograph.Shapes.BeamOptionsFactory()).createAllOptions()).select(function (x) {
            var beamOption = {
                endCapsToothCount: endCapsToothCount,
                toothHeight: 2,
                totalToothCount: totalToothCount,
                toothWidth: 4
            };

            endCapsToothCount += 2;
            totalToothCount += 2;

            return { originalGear: x, modifiedGear: beamOption };
        }).orderBy(function (x) {
            return x.originalGear.totalToothCount;
        }).forEach(function (beam) {
            var gearContainer = d3.select(fixedContainer).append('div').attr({
                'class': 'gear-container',
                'data-tooth-count': beam.originalGear.totalToothCount
            });

            var svgContainer = gearContainer.append("svg").attr({
                width: containerSize,
                height: containerSize
            });

            gearContainer.append('div').attr('class', 'gear-label color-changing' + (beam.originalGear.totalToothCount > 99 ? ' small-label' : '')).html(beam.originalGear.totalToothCount);

            svgContainer.append('g').attr('class', 'gear fixed color-changing').attr("transform", "translate(" + containerSize / 2 + "," + containerSize / 2 + ")").datum(beam.modifiedGear).append("path").attr("d", Spirograph.Shapes.Beam);

            // append a placeholder to the rotating gear list to keep the lists the same length visually
            var placeholderGearContainer = d3.select(rotatingContainer).append('div').attr({
                'class': 'gear-container placeholder',
                'data-tooth-count': 'placeholder'
            });
        });

        // add all the ring gear options to the list of fixed gears
        var innerToothCount = 11, innerRadius = 5, outerToothCount = 16, outerRadius = 13;
        Enumerable.from((new Spirograph.Shapes.RingGearOptionsFactory()).createAllOptions()).select(function (x) {
            var ringGearOption = {
                innerRadius: innerRadius,
                innerToothCount: innerToothCount,
                innerToothHeight: 3,
                outerRadius: outerRadius,
                outerToothCount: outerToothCount,
                outerToothHeight: 3
            };

            innerToothCount += 2;
            innerRadius += 2;
            outerToothCount += 2;
            outerRadius += 2;

            return { originalGear: x, modifiedGear: ringGearOption };
        }).orderBy(function (x) {
            return x.originalGear.innerToothCount;
        }).forEach(function (ringGear) {
            var gearContainer = d3.select(fixedContainer).append('div').attr({
                'class': 'gear-container',
                'data-tooth-count': ringGear.originalGear.outerToothCount + '|' + ringGear.originalGear.innerToothCount
            });

            var svgContainer = gearContainer.append("svg").attr({
                width: containerSize,
                height: containerSize
            });

            gearContainer.append('div').attr('class', 'gear-label color-changing ring-gear-label').html('<div>' + ringGear.originalGear.outerToothCount + '</div><hr /><div>' + ringGear.originalGear.innerToothCount + '</div>');

            svgContainer.append('g').attr('class', 'gear fixed color-changing').attr("transform", "translate(" + containerSize / 2 + "," + containerSize / 2 + ")").datum(ringGear.modifiedGear).append("path").attr("d", Spirograph.Shapes.RingGear);

            // append a placeholder to the rotating gear list to keep the lists the same length visually
            var placeholderGearContainer = d3.select(rotatingContainer).append('div').attr({
                'class': 'gear-container placeholder',
                'data-tooth-count': 'placeholder'
            });
        });

        // add an extra placeholder onto the bottom of each container for breathing room
        [fixedContainer, rotatingContainer].forEach(function (container) {
            d3.select(container).append('div').attr({
                'class': 'gear-container placeholder',
                'data-tooth-count': 'placeholder'
            });
        });

        // add click events for all gear options
        $('#gear-options-selector').on('click', '.gear-container', function (ev) {
            var $target = $(ev.currentTarget);
            var targetToothCount = $target.attr('data-tooth-count');

            if (targetToothCount !== 'placeholder') {
                $target.addClass('selected').siblings().removeClass('selected');
                var fixedOrRotating = $target.parents('.fixed-container').length !== 0 ? 'fixed' : 'rotating';

                Spirograph.EventAggregator.publish('gearSelected', targetToothCount, fixedOrRotating);
            }
        });
    })(Spirograph.UI || (Spirograph.UI = {}));
    var UI = Spirograph.UI;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=gear-options-selector.js.map
