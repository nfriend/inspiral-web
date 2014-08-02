/// <reference path='definitions/references.d.ts' />

module Spirograph {
    'use strict';

    export var defaults = {
        rotatingGearToothCount: 64,
        holeIndex: 3,
        fixedGearType: FixedGearType.Ring,
        fixedGearInnerToothCount: 96,
        fixedGearOuterToothCount: 144,
        foreground: {
            r: 255,
            g: 0,
            b: 0,
            a: .4
        },
        background: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
    }
} 