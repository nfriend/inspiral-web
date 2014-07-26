/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    export interface HoleOptions {
        // the distance from the center of the gear to this hole
        positionRadius: number;
        // the angle of this hole, with respect to the gear
        angle: number;
        // the radius of the hole itself
        radius?: number;
    }
} 