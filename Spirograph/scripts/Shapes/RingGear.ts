/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Shapes {
    export function RingGear(options: RingGearOptions) {
        return "SDFSDF";
    }

    export interface RingGearOptions {
        innerRadius: number;
        innerToothHeight?: number;
        innerToothCount: number;
        outerRadius: number;
        outerToothHeight?: number;
        outerToothCount: number;
    }
}
