/// <reference path='../definitions/references.d.ts' />

module Spirograph.Initialization {
    'use strict';

    export function initializeHoles(gear: D3.Selection, gearOptions: Shapes.GearOptions) {
        var allHoleOptions = (new Shapes.GearHoleGenerator()).generate(gearOptions);
        var holeOptions: Shapes.HoleOptions;
        allHoleOptions.forEach((hole, index) => {
            var holeObject = gear.append('path')
                .attr('class', 'gear-hole')
                .datum(hole)
                .attr('d', Shapes.GearHole);

            holeObject.on('click', () => {
                d3.selectAll('.selected').classed('selected', false);
                holeObject.classed('selected', true);

                holeOptions = hole;

                EventAggregator.publish('holeSelected', hole);

                //initializeGearAndPen(false);
            });
        });

        return holeOptions;
    }
} 