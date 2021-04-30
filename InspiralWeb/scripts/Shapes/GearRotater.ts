﻿/// <reference path='../definitions/references.d.ts' />

module InspiralWeb.Shapes {
    'use strict';

    export class GearRotater implements Rotater {

        private _fixedGearOptions: GearOptions;
        private _teethBuffer = 2;

        constructor(fixedGearOptions: GearOptions) {
            this._fixedGearOptions = fixedGearOptions;
        }

        rotate(rotatingGearOptions: GearOptions, mouseAngleAsDegrees: number, holeOptions: HoleOptions, toothOffset: number): TransformInfo {
            var radius = this._fixedGearOptions.radius + rotatingGearOptions.radius + this._teethBuffer;

            //TODO: normalize tooth height handling
            radius += this._fixedGearOptions.toothHeight;

            var gearX = radius * Math.cos(Utility.toRadians(mouseAngleAsDegrees)) + getSvgCenterX();
            var gearY = -1 * radius * Math.sin(Utility.toRadians(mouseAngleAsDegrees)) + getSvgCenterY();

            //TODO: normalize tooth height handling
            var gearRotation = -360 * (((mouseAngleAsDegrees / 360) * 2 * Math.PI * (this._fixedGearOptions.radius)) / (2 * Math.PI * rotatingGearOptions.radius));
            gearRotation -= (mouseAngleAsDegrees);

            // move the gear's rotation by half a tooth width, so the teeth visually mesh
            if (rotatingGearOptions.toothCount % 2 === 0) {
                gearRotation += (360 / rotatingGearOptions.toothCount) / 2;
            }

            gearRotation += toothOffset * (-360 / rotatingGearOptions.toothCount);

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
