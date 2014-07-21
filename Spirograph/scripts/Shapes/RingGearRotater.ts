/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Shapes {

    export interface TransformInfo {
        x: number;
        y: number;
        angle: number;
        penX: number;
        penY: number;
    }

    export class RingGearRotater {

        private _ringGearOptions: RingGearOptions;
        private _teethBuffer = 2;

        constructor(ringGearOptions: RingGearOptions) {
            this._ringGearOptions = ringGearOptions;
        }

        rotate(gearOptions: GearOptions, mouseAngleAsDegrees: number, holeOptions: HoleOptions): TransformInfo {

            var radius = this._ringGearOptions.innerRadius - gearOptions.radius - this._teethBuffer;
            var gearX = radius * Math.cos(Utility.toRadians(mouseAngleAsDegrees)) + Utility.getCenterX();
            var gearY = -1 * radius * Math.sin(Utility.toRadians(mouseAngleAsDegrees)) + Utility.getCenterY();
            var gearRotation = 360 * (((mouseAngleAsDegrees / 360) * 2 * Math.PI * this._ringGearOptions.innerRadius) / (2 * Math.PI * gearOptions.radius));
            gearRotation -= mouseAngleAsDegrees;

            var penXModifer = holeOptions.positionRadius * Math.cos(Utility.toRadians(holeOptions.angle) + Utility.toRadians(gearRotation));
            var penYModifier = holeOptions.positionRadius * Math.sin(Utility.toRadians(holeOptions.angle) + Utility.toRadians(gearRotation));

            return {
                x: gearX,
                y: gearY,
                angle: gearRotation,
                penX: gearX + penXModifer,
                penY: gearY + penYModifier
            };
        }
    }
} 