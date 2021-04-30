/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Initialization {
    'use strict';

    export function initializeGearSelections() {
        // set up the defaults to be already selected
        $('#gear-options-selector .rotating-container .gear-container[data-tooth-count-1=' + defaults.rotatingGearToothCount + ']').click();
        $('#gear-options-selector .fixed-container .gear-container[data-tooth-count-1=' + defaults.fixedGearOuterToothCount + '][data-tooth-count-2=' + defaults.fixedGearInnerToothCount + ']').click();
    }
}
