/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Initialization {
    'use strict';

    var initiallySelectedHoleObject = null;

    export function initializeHoles(gear,gearOptions: Shapes.GearOptions, selectedIndex: number) {
        var allHoleOptions = (new Shapes.GearHoleGenerator()).generate(gearOptions);
        var holeOptions: Shapes.HoleOptions;
        allHoleOptions.forEach((hole, index) => {
            var holeObject = gear.append('path')
                .attr('class', 'gear-hole')
                .datum(hole)
                .attr('d', Shapes.GearHole);

            holeObject.on('mousedown', () => {
                d3.event.stopPropagation();
            });

            holeObject.on('click', () => {
                d3.selectAll('.gear-hole.selected').classed('selected', false);
                holeObject.classed('selected', true);

                EventAggregator.publish('holeSelected', hole);
                Interaction.saveHoleSelection(index, gearOptions.toothCount);
            });

            if (index === selectedIndex) {
                // store this for later, when we need it to set it as the default
                initiallySelectedHoleObject = holeObject;
                // also return the hole to be selected right now, so that we can perform initialization calculations on it
                holeOptions = hole;
            }
        });

        return holeOptions;
    }

    export function initializeHoleSelection() {
        if (initiallySelectedHoleObject === null) {
            throw 'initializeHoleSelection must be called after a call to initializeHoles';
        }

        (<any>initiallySelectedHoleObject.on('click'))();
    }
}
