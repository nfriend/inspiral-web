/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    export interface GearOptions {
        // the radius of gear, NOT including the additional height of the teeth
        radius: number;
        // how tall each tooth should be
        toothHeight?: number;
        // how many teeth to draw on the gear
        toothCount: number;
        // how large each hole should be
        holeRadius?: number;
        // how many degrees to rotate while positioning the holes
        holeSweepAngle?: number;
        // how much space leave at the tip and center of the circle
        holePositionBuffer?: number;
        // how many holes to cut out of the gear
        holeCount: number;
    }
} 