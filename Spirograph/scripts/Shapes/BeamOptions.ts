/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Shapes {

    export interface BeamOptions {
        // how tall each tooth should be
        toothHeight?: number;
        // the total number of teeth that should appear on this beam; must be an even number
        totalToothCount: number;
        // how many teeth to draw on the end caps; must be an even number.
        endCapsToothCount: number;
    }
} 