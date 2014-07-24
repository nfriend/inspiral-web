/// <reference path='../definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (Shapes) {
        var BeamRotater = (function () {
            function BeamRotater(beamOptions) {
                this._teethBuffer = 2;
                this._beamOptions = beamOptions;
            }
            BeamRotater.prototype.rotate = function (gearOptions, mouseAngleAsDegrees, holeOptions) {
                // get the mouse angle into a standard -180 to 180 range
                var normalizedMouseAngleAsDegrees = (((mouseAngleAsDegrees % 360) + 360) % 360);
                normalizedMouseAngleAsDegrees = normalizedMouseAngleAsDegrees > 180 ? -360 + normalizedMouseAngleAsDegrees : normalizedMouseAngleAsDegrees;

                var radius = 2 * this._beamOptions.endCapsToothCount, beamToothCount = this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount, toothWidth = 2 * Math.PI * radius / this._beamOptions.endCapsToothCount, totalWidth = 2 * radius + toothWidth * (beamToothCount / 2), beamWidth = (this._beamOptions.totalToothCount - this._beamOptions.endCapsToothCount) / 2 * toothWidth, perimeter = 2 * Math.PI * radius + beamToothCount * toothWidth;

                var gearX, gearY, gearRotation, penX, penY, rotations, positionAngleOffset = 0;

                if (normalizedMouseAngleAsDegrees >= -30 && normalizedMouseAngleAsDegrees <= 30) {
                    gearX = (radius + gearOptions.radius + this._teethBuffer) * Math.cos(Spirograph.Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.sin(Spirograph.Utility.toRadians(normalizedMouseAngleAsDegrees * 3)) + Spirograph.Utility.getCenterY();
                    if (normalizedMouseAngleAsDegrees >= 0) {
                        var distanceTravelled = (normalizedMouseAngleAsDegrees / 30) * (2 * Math.PI * radius / 4);
                    } else {
                        var distanceTravelled = (1 - (normalizedMouseAngleAsDegrees / -30)) * (2 * Math.PI * radius / 4) + (2 * Math.PI * radius * .75) + (2 * beamWidth);
                    }
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                    positionAngleOffset = (normalizedMouseAngleAsDegrees / 30) * 90 - 90;
                } else if (normalizedMouseAngleAsDegrees > 30 && normalizedMouseAngleAsDegrees < 150) {
                    gearX = -1 * ((normalizedMouseAngleAsDegrees - 90) / 60) * (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) + Spirograph.Utility.getCenterY();
                    var distanceTravelled = (((normalizedMouseAngleAsDegrees - 30) / 120) * beamWidth + (2 * Math.PI * radius / 4));
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                } else if (normalizedMouseAngleAsDegrees >= 150) {
                    gearX = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.cos(Spirograph.Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.sin(Spirograph.Utility.toRadians((180 - normalizedMouseAngleAsDegrees) * 3)) + Spirograph.Utility.getCenterY();
                    var distanceTravelled = (2 * Math.PI * radius / 4) * ((normalizedMouseAngleAsDegrees - 150) / 30) + (beamWidth + (2 * Math.PI * radius / 4));
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                    positionAngleOffset = ((normalizedMouseAngleAsDegrees - 150) / 30) * 90;
                } else if (normalizedMouseAngleAsDegrees <= -150) {
                    gearX = -1 * (radius + gearOptions.radius + this._teethBuffer) * Math.cos(Spirograph.Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) - (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = (radius + gearOptions.radius + this._teethBuffer) * Math.sin(Spirograph.Utility.toRadians((-180 + normalizedMouseAngleAsDegrees) * 3)) + Spirograph.Utility.getCenterY();
                    var distanceTravelled = (2 * Math.PI * radius / 4) * (1 - ((normalizedMouseAngleAsDegrees + 150) / -30)) + (beamWidth + (2 * Math.PI * radius / 2));
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                    positionAngleOffset = ((normalizedMouseAngleAsDegrees + 150) / 30) * 90 + 180;
                } else if (normalizedMouseAngleAsDegrees < -30 && normalizedMouseAngleAsDegrees > -150) {
                    gearX = ((normalizedMouseAngleAsDegrees + 90) / 60) * (beamWidth / 2) + Spirograph.Utility.getCenterX();
                    gearY = radius + gearOptions.radius + this._teethBuffer + Spirograph.Utility.getCenterY();
                    var distanceTravelled = (1 - (normalizedMouseAngleAsDegrees + 30) / -120) * beamWidth + beamWidth + (2 * Math.PI * radius * .75);
                    rotations = (Math.floor(mouseAngleAsDegrees / 360) * 360) + (distanceTravelled / perimeter) * 360;
                    positionAngleOffset = 180;
                }

                var gearRotation = -360 * (((rotations / 360) * perimeter) / (2 * Math.PI * gearOptions.radius));
                gearRotation -= positionAngleOffset;

                var penXModifer = holeOptions.positionRadius * Math.cos(Spirograph.Utility.toRadians(holeOptions.angle) + Spirograph.Utility.toRadians(gearRotation));
                var penYModifier = holeOptions.positionRadius * Math.sin(Spirograph.Utility.toRadians(holeOptions.angle) + Spirograph.Utility.toRadians(gearRotation));

                return {
                    x: gearX,
                    y: gearY,
                    angle: gearRotation,
                    penX: gearX + penXModifer,
                    penY: gearY + penYModifier
                };
            };
            return BeamRotater;
        })();
        Shapes.BeamRotater = BeamRotater;
    })(Spirograph.Shapes || (Spirograph.Shapes = {}));
    var Shapes = Spirograph.Shapes;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=BeamRotater.js.map
