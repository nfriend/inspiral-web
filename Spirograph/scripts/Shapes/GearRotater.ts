/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    export class GearRotater {

        private _fixedGearOptions: GearOptions;
        private _teethBuffer = 2;

        constructor(fixedGearOptions: GearOptions) {
            this._fixedGearOptions = fixedGearOptions;
        }

        rotate(rotatingGearOptions: GearOptions, mouseAngleAsDegrees: number, holeOptions: HoleOptions): TransformInfo {
            var radius = this._fixedGearOptions.radius + rotatingGearOptions.radius + this._teethBuffer;

            //TODO: normalize tooth height handling
            radius += this._fixedGearOptions.toothHeight;

            var gearX = radius * Math.cos(Utility.toRadians(mouseAngleAsDegrees)) + getSvgCenterX();
            var gearY = -1 * radius * Math.sin(Utility.toRadians(mouseAngleAsDegrees)) + getSvgCenterY();

            //TODO: normalize tooth height handling
            var gearRotation = -360 * (((mouseAngleAsDegrees / 360) * 2 * Math.PI * (this._fixedGearOptions.radius)) / (2 * Math.PI * rotatingGearOptions.radius));
            gearRotation -= (mouseAngleAsDegrees);

            if ((this._fixedGearOptions.toothCount + rotatingGearOptions.toothCount) % 2 === 0) {
                // move the gear's rotation by half a tooth width, so the teeth visually mesh
                gearRotation += (360 / rotatingGearOptions.toothCount) / 2;
            }

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