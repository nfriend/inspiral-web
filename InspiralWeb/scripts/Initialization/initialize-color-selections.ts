/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Initialization {
    'use strict';

    export function initializeColorSelections() {
        // set the first selections as the default
        $('#color-selector .foreground-container .color-container').first().click();
        $('#color-selector .background-container .color-container').first().click();
    }
}
