/// <reference path='../definitions/references.d.ts' />

module Spirograph.Initialization {
    'use strict';

    export function initializeGearSelections() {
        // set up the defaults to be already selected
        $('#gear-options-selector .rotating-container .gear-container[data-tooth-count=' + defaults.rotatingGearToothCount + ']').click();
        $('#gear-options-selector .fixed-container .gear-container[data-tooth-count="' + defaults.fixedGearOuterToothCount + '|' + defaults.fixedGearInnerToothCount + '"]').click();
    }
}  