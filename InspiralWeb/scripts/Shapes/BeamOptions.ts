/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Shapes {
    'use strict';

    export interface BeamOptions {
        // how tall each tooth should be
        toothHeight?: number;
        // the total number of teeth that should appear on this beam; must be an even number
        totalToothCount: number;
        // how many teeth to draw on the end caps; must be an even number.
        endCapsToothCount: number;

        // only used when generating beams for display - using this parameter will mess with ratios otherwise
        toothWidth?: number;
    }
}
