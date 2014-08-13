/// <reference path='../definitions/references.d.ts' />

module Spirograph.Shapes {
    'use strict';

    export class BeamRotater implements Rotater {

        private _beamOptions: BeamOptions;
        private _teethBuffer = 2;

        constructor(beamOptions: BeamOptions) {
            this._beamOptions = beamOptions;
        }

        rotate(gearOptions: GearOptions, mouseAngleAsDegrees: number, holeOptions: HoleOptions, toothOffset: number): TransformInfo {

            // get the mouse angle into a standard -180 to 180 range
            var normalizedMouseAngleAsDegrees = (((mouseAngleAsDegrees % 360) + 360) % 360);
            normalizedMouseAngleAsDegrees = normalizedMouseAngleAsDegrees > 180 ? -360 + normalizedMouseAngleAsDegrees : normalizedMouseAngleAsDegrees;

            var radius = 2 * this._beamOptions.endCapsToothCount,
                beamToothCount = this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount,
                toothWidth = 2 * Math.PI * radius / this._beamOptions.endCapsToothCount,
                totalWidth = 2 * radius + toothWidth * (beamToothCount / 2),
                beamWidth = (this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount) / 2 * toothWidth,
                perimeter = 2 * Math.PI * radius + beamToothCount * toothWidth;

            var gearX: number, gearY: number, gearRotation: number, penX: number, penY: number, rotations: number, positionAngleOffset = 0;

            if (normalizedMouseAngleAsDegrees >= -30 && normalizedMouseAngleAsDegrees <= 30) {
                gearX = (radius + gearOptions.radius + this._teethBuffer) * Math.cos(Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + (beamWidth / 2) +  getSvgCenterX();
                gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.sin(Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + getSvgCenterY();
                if (normalizedMouseAngleAsDegrees >= 0) {
                    var distanceTravelled = (normalizedMouseAngleAsDegrees / 30) * (2 * Math.PI * radius / 4);
                } else {
                    var distanceTravelled = (1 - (normalizedMouseAngleAsDegrees / -30)) * (2 * Math.PI * radius / 4) + (2 * Math.PI * radius * .75) + (2 * beamWidth);
                }
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                positionAngleOffset = (normalizedMouseAngleAsDegrees / 30) * 90 - 90;
            } else if (normalizedMouseAngleAsDegrees > 30 && normalizedMouseAngleAsDegrees < 150) {
                gearX = -1 * ((normalizedMouseAngleAsDegrees - 90) / 60) * (beamWidth / 2) + getSvgCenterX();
                gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) + getSvgCenterY();
                var distanceTravelled = (((normalizedMouseAngleAsDegrees - 30) / 120) * beamWidth + (2 * Math.PI * radius / 4));
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
            } else if (normalizedMouseAngleAsDegrees >= 150) {
                gearX = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.cos(Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + getSvgCenterX();
                gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.sin(Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) + getSvgCenterY();
                var distanceTravelled = (2 * Math.PI * radius / 4) * ((normalizedMouseAngleAsDegrees - 150) / 30) + (beamWidth + (2 * Math.PI * radius / 4));
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                positionAngleOffset = ((normalizedMouseAngleAsDegrees - 150) / 30) * 90;
            } else if (normalizedMouseAngleAsDegrees <= -150) {
                gearX = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.cos(Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + getSvgCenterX();
                gearY = (radius + gearOptions.radius + this._teethBuffer) * Math.sin(Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) + getSvgCenterY();
                var distanceTravelled = (2 * Math.PI * radius / 4) * (1 - ((normalizedMouseAngleAsDegrees + 150) / -30)) + (beamWidth + (2 * Math.PI * radius / 2));
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                positionAngleOffset = ((normalizedMouseAngleAsDegrees + 150) / 30) * 90 + 180;
            } else if (normalizedMouseAngleAsDegrees < -30 && normalizedMouseAngleAsDegrees > -150) {
                gearX = ((normalizedMouseAngleAsDegrees + 90) / 60) * (beamWidth / 2) + getSvgCenterX();
                gearY = radius + gearOptions.radius + this._teethBuffer + getSvgCenterY()
                var distanceTravelled = (1 - (normalizedMouseAngleAsDegrees + 30) / -120) * beamWidth + beamWidth + (2 * Math.PI * radius * .75);
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                positionAngleOffset = 180;
            }

            var gearRotation = -360 * (((rotations / 360) * perimeter) / (2 * Math.PI * gearOptions.radius));
            gearRotation -= positionAngleOffset;

            // move the gear's rotation by half a tooth width, so the teeth visually mesh
            // what's the general pattern here?  Don't feel like figuring it out right now, I'll just hardcode.
            if (gearOptions.toothCount === 63 || gearOptions.toothCount === 75) {
                gearRotation += (360 / gearOptions.toothCount) * 3 / 4;
            } else if (gearOptions.toothCount === 45) {
                gearRotation += (360 / gearOptions.toothCount) / 4;
            } else if (gearOptions.toothCount === 50 || gearOptions.toothCount == 30) {
                gearRotation += (360 / gearOptions.toothCount) / 2;
            }

            gearRotation += toothOffset * (-360 / gearOptions.toothCount);

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