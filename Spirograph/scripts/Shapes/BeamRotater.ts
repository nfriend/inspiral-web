/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Shapes {

    export class BeamRotater {

        private _beamOptions: BeamOptions;
        private _teethBuffer = 2;

        constructor(beamOptions: BeamOptions) {
            this._beamOptions = beamOptions;
        }

        rotate(gearOptions: GearOptions, mouseAngleAsDegrees: number, holeOptions: HoleOptions): TransformInfo {

            // get the mouse angle into a standard -180 to 180 range
            var normalizedMouseAngleAsDegrees = (((mouseAngleAsDegrees % 360) + 360) % 360);
            normalizedMouseAngleAsDegrees = normalizedMouseAngleAsDegrees > 180 ? -360 + normalizedMouseAngleAsDegrees : normalizedMouseAngleAsDegrees;

            var radius = 2 * this._beamOptions.endCapsToothCount,
                beamToothCount = this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount,
                toothWidth = 2 * Math.PI * radius / this._beamOptions.endCapsToothCount,
                totalWidth = 2 * radius + toothWidth * (beamToothCount / 2),
                beamWidth = (this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount) / 2 * toothWidth,
                perimeter = 2 * Math.PI * radius + 2 * beamToothCount * toothWidth;

            var gearX: number, gearY: number, gearRotation: number, penX: number, penY: number, rotations: number, positionAngleOffset = 0;

            if (normalizedMouseAngleAsDegrees >= -30 && normalizedMouseAngleAsDegrees <= 30) {
                gearX = (radius + gearOptions.radius) * Math.cos(Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + (beamWidth / 2) +  Utility.getCenterX();
                gearY = -1 * (radius + gearOptions.radius) * Math.sin(Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + Utility.getCenterY();
            } else if (normalizedMouseAngleAsDegrees > 30 && normalizedMouseAngleAsDegrees < 150) {
                gearX = -1 * ((normalizedMouseAngleAsDegrees - 90) / 60) * (beamWidth / 2) + Utility.getCenterX();
                gearY = -1 * (radius + gearOptions.radius) + Utility.getCenterY();
                var distanceTravelled = (((normalizedMouseAngleAsDegrees - 30) / 120) * beamWidth + (2 * Math.PI * radius / 4));
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
            } else if (normalizedMouseAngleAsDegrees >= 150) {
                gearX = -1 * (radius + gearOptions.radius) * Math.cos(Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + Utility.getCenterX();
                gearY = -1 * (radius + gearOptions.radius) * Math.sin(Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) + Utility.getCenterY();
                var distanceTravelled = (2 * Math.PI * radius / 4) * ((normalizedMouseAngleAsDegrees - 150) / 30) + (beamWidth + (2 * Math.PI * radius / 4));
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                positionAngleOffset = ((normalizedMouseAngleAsDegrees - 150) / 30) * 90;
            } else if (normalizedMouseAngleAsDegrees <= -150) {
                gearX = -1 * (radius + gearOptions.radius) * Math.cos(Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + Utility.getCenterX();
                gearY = (radius + gearOptions.radius) * Math.sin(Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) + Utility.getCenterY();
                var distanceTravelled = (2 * Math.PI * radius / 4) * (1 - ((normalizedMouseAngleAsDegrees + 150) / -30)) + (beamWidth + (2 * Math.PI * radius / 2));
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                positionAngleOffset = ((normalizedMouseAngleAsDegrees - 150) / 30) * 90;
            } else if (normalizedMouseAngleAsDegrees < -30 && normalizedMouseAngleAsDegrees > -150) {
                gearX = ((normalizedMouseAngleAsDegrees + 90) / 60) * (beamWidth / 2) + Utility.getCenterX();
                gearY = radius + gearOptions.radius + Utility.getCenterY()
                rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (((1 - (normalizedMouseAngleAsDegrees + 30) / -120) * beamWidth + beamWidth + (2 * Math.PI * radius * 1.5)) / perimeter) * 360;
            }

            //var radius = this._beamOptions.innerRadius - gearOptions.radius - this._teethBuffer;
            //var gearX = radius * Math.cos(Utility.toRadians(mouseAngleAsDegrees)) + Utility.getCenterX();
            //var gearY = -1 * radius * Math.sin(Utility.toRadians(mouseAngleAsDegrees)) + Utility.getCenterY();
            var gearRotation = -360 * (((rotations / 360) * perimeter) / (2 * Math.PI * gearOptions.radius));
            gearRotation -= positionAngleOffset;

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