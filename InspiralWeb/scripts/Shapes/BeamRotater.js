/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var Shapes;
    (function (Shapes) {
        'use strict';
        var BeamRotater = /** @class */ (function () {
            function BeamRotater(beamOptions) {
                this._teethBuffer = 2;
                this._beamOptions = beamOptions;
            }
            BeamRotater.prototype.rotate = function (gearOptions, mouseAngleAsDegrees, holeOptions, toothOffset) {
                // get the mouse angle into a standard -180 to 180 range
                var normalizedMouseAngleAsDegrees = (((mouseAngleAsDegrees % 360) + 360) % 360);
                normalizedMouseAngleAsDegrees = normalizedMouseAngleAsDegrees > 180 ? -360 + normalizedMouseAngleAsDegrees : normalizedMouseAngleAsDegrees;
                var radius = 2 * this._beamOptions.endCapsToothCount, beamToothCount = this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount, toothWidth = 2 * Math.PI * radius / this._beamOptions.endCapsToothCount, totalWidth = 2 * radius + toothWidth * (beamToothCount / 2), beamWidth = (this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount) / 2 * toothWidth, perimeter = 2 * Math.PI * radius + beamToothCount * toothWidth;
                var gearX, gearY, gearRotation, penX, penY, rotations, positionAngleOffset = 0;
                if (normalizedMouseAngleAsDegrees >= -30 && normalizedMouseAngleAsDegrees <= 30) {
                    gearX = (radius + gearOptions.radius + this._teethBuffer) * Math.cos(InspiralWeb.Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + (beamWidth / 2) + InspiralWeb.getSvgCenterX();
                    gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.sin(InspiralWeb.Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + InspiralWeb.getSvgCenterY();
                    if (normalizedMouseAngleAsDegrees >= 0) {
                        var distanceTravelled = (normalizedMouseAngleAsDegrees / 30) * (2 * Math.PI * radius / 4);
                    }
                    else {
                        var distanceTravelled = (1 - (normalizedMouseAngleAsDegrees / -30)) * (2 * Math.PI * radius / 4) + (2 * Math.PI * radius * .75) + (2 * beamWidth);
                    }
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                    positionAngleOffset = (normalizedMouseAngleAsDegrees / 30) * 90 - 90;
                }
                else if (normalizedMouseAngleAsDegrees > 30 && normalizedMouseAngleAsDegrees < 150) {
                    gearX = -1 * ((normalizedMouseAngleAsDegrees - 90) / 60) * (beamWidth / 2) + InspiralWeb.getSvgCenterX();
                    gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) + InspiralWeb.getSvgCenterY();
                    var distanceTravelled = (((normalizedMouseAngleAsDegrees - 30) / 120) * beamWidth + (2 * Math.PI * radius / 4));
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                }
                else if (normalizedMouseAngleAsDegrees >= 150) {
                    gearX = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.cos(InspiralWeb.Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + InspiralWeb.getSvgCenterX();
                    gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.sin(InspiralWeb.Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) + InspiralWeb.getSvgCenterY();
                    var distanceTravelled = (2 * Math.PI * radius / 4) * ((normalizedMouseAngleAsDegrees - 150) / 30) + (beamWidth + (2 * Math.PI * radius / 4));
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                    positionAngleOffset = ((normalizedMouseAngleAsDegrees - 150) / 30) * 90;
                }
                else if (normalizedMouseAngleAsDegrees <= -150) {
                    gearX = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.cos(InspiralWeb.Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + InspiralWeb.getSvgCenterX();
                    gearY = (radius + gearOptions.radius + this._teethBuffer) * Math.sin(InspiralWeb.Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) + InspiralWeb.getSvgCenterY();
                    var distanceTravelled = (2 * Math.PI * radius / 4) * (1 - ((normalizedMouseAngleAsDegrees + 150) / -30)) + (beamWidth + (2 * Math.PI * radius / 2));
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                    positionAngleOffset = ((normalizedMouseAngleAsDegrees + 150) / 30) * 90 + 180;
                }
                else if (normalizedMouseAngleAsDegrees < -30 && normalizedMouseAngleAsDegrees > -150) {
                    gearX = ((normalizedMouseAngleAsDegrees + 90) / 60) * (beamWidth / 2) + InspiralWeb.getSvgCenterX();
                    gearY = radius + gearOptions.radius + this._teethBuffer + InspiralWeb.getSvgCenterY();
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
                }
                else if (gearOptions.toothCount === 45) {
                    gearRotation += (360 / gearOptions.toothCount) / 4;
                }
                else if (gearOptions.toothCount === 50 || gearOptions.toothCount == 30) {
                    gearRotation += (360 / gearOptions.toothCount) / 2;
                }
                gearRotation += toothOffset * (-360 / gearOptions.toothCount);
                var penXModifer = holeOptions.positionRadius * Math.cos(InspiralWeb.Utility.toRadians(holeOptions.angle) + InspiralWeb.Utility.toRadians(gearRotation));
                var penYModifier = holeOptions.positionRadius * Math.sin(InspiralWeb.Utility.toRadians(holeOptions.angle) + InspiralWeb.Utility.toRadians(gearRotation));
                return {
                    x: gearX,
                    y: gearY,
                    angle: gearRotation,
                    penX: gearX + penXModifer,
                    penY: gearY + penYModifier
                };
            };
            return BeamRotater;
        }());
        Shapes.BeamRotater = BeamRotater;
    })(Shapes = InspiralWeb.Shapes || (InspiralWeb.Shapes = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=BeamRotater.js.map